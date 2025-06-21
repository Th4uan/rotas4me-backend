import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
  Client,
  TravelMode,
  TravelRestriction,
  Language,
} from '@googlemaps/google-maps-services-js';
import { RouteSafetyUtil } from './utils/route-safety.util';
import { MarkerResponseDto } from '../marker/dto/response/marker-response.dto';
import {
  GoogleMapsDirectionsParams,
  GoogleMapsApiError,
} from './types/google-maps.types';
import appConfig from 'src/app/configs/app.config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class MapsService {
  private client: Client;
  private apiKey: string;

  constructor(
    @Inject(appConfig.KEY)
    private readonly config: ConfigType<typeof appConfig>,
  ) {
    this.client = new Client({});
    this.apiKey = this.config.google.apiKey as string;
  }

  async getDirections(
    origin: string,
    destination: string,
    waypoints?: string[],
    mode: TravelMode = TravelMode.walking,
    dangerousMarkers?: MarkerResponseDto[],
  ) {
    try {
      if (!origin || !destination) {
        throw new BadRequestException('Origem e destino são obrigatórios');
      }

      if (!this.apiKey) {
        throw new BadRequestException(
          'Chave da API do Google Maps não configurada',
        );
      }

      const filteredWaypoints = waypoints?.filter(
        (wp) => wp && wp.trim() !== '',
      );

      const routeParams: GoogleMapsDirectionsParams = {
        origin,
        destination,
        key: this.apiKey,
        mode,
        language: Language.pt_BR,
        region: 'br',
      };

      if (filteredWaypoints && filteredWaypoints.length > 0) {
        routeParams.waypoints = filteredWaypoints;
      }

      const response = await this.client.directions({
        params: routeParams,
      });

      if (
        !response.data ||
        !response.data.routes ||
        response.data.routes.length === 0
      ) {
        throw new BadRequestException(
          'Nenhuma rota encontrada para os parâmetros fornecidos',
        );
      }

      if (dangerousMarkers && dangerousMarkers.length > 0) {
        const routePoints = RouteSafetyUtil.extractRoutePoints(response.data);
        const dangerousMarkersNearRoute =
          RouteSafetyUtil.filterDangerousMarkersNearRoute(
            dangerousMarkers,
            routePoints,
            300,
          );

        console.log(
          `Rota calculada. ${dangerousMarkersNearRoute.length} marcadores perigosos encontrados próximos à rota de ${dangerousMarkers.length} total.`,
        );

        if (dangerousMarkersNearRoute.length > 0) {
          console.log(
            'Tentando calcular rota alternativa para evitar marcadores perigosos...',
          );

          try {
            const alternativeParams = {
              ...routeParams,
              avoid: [TravelRestriction.tolls],
              alternatives: true,
            };

            const alternativeResponse = await this.client.directions({
              params: alternativeParams,
            });

            if (
              alternativeResponse.data &&
              alternativeResponse.data.routes &&
              alternativeResponse.data.routes.length > 1
            ) {
              let bestRoute = alternativeResponse.data.routes[0];
              let bestSafetyScore = 0;

              for (const route of alternativeResponse.data.routes) {
                const routeData = { routes: [route], status: 'OK' };
                const points = RouteSafetyUtil.extractRoutePoints(routeData);
                const nearDangerous =
                  RouteSafetyUtil.filterDangerousMarkersNearRoute(
                    dangerousMarkers,
                    points,
                    300,
                  );

                const safetyScore = 100 - nearDangerous.length * 10;
                if (safetyScore > bestSafetyScore) {
                  bestSafetyScore = safetyScore;
                  bestRoute = route;
                }
              }

              console.log(
                `Rota alternativa selecionada com score de segurança: ${bestSafetyScore}`,
              );
              return {
                routes: [bestRoute],
                status: alternativeResponse.data.status,
              };
            }
          } catch (alternativeError) {
            console.log(
              'Erro ao calcular rota alternativa:',
              (alternativeError as Error).message,
            );
          }
        }
      }

      return response.data;
    } catch (error) {
      console.error('Erro ao calcular rota:', error);

      if (error instanceof BadRequestException) {
        throw error;
      }

      const apiError = error as GoogleMapsApiError;
      if (apiError.response?.data?.error_message) {
        throw new BadRequestException(
          `Erro da API do Google Maps: ${apiError.response.data.error_message}`,
        );
      }

      if (apiError.response?.data?.status) {
        const status = apiError.response.data.status;
        switch (status) {
          case 'NOT_FOUND':
            throw new BadRequestException(
              'Endereço não encontrado. Verifique se os endereços estão corretos.',
            );
          case 'ZERO_RESULTS':
            throw new BadRequestException(
              'Nenhuma rota encontrada entre os pontos especificados.',
            );
          case 'OVER_DAILY_LIMIT':
          case 'OVER_QUERY_LIMIT':
            throw new BadRequestException(
              'Limite de uso da API excedido. Tente novamente mais tarde.',
            );
          case 'REQUEST_DENIED':
            throw new BadRequestException(
              'Acesso negado à API do Google Maps.',
            );
          case 'INVALID_REQUEST':
            throw new BadRequestException(
              'Parâmetros inválidos na solicitação.',
            );
          default:
            throw new BadRequestException(
              `Erro da API do Google Maps: ${status}`,
            );
        }
      }

      throw new BadRequestException(
        'Erro interno ao calcular a rota. Tente novamente.',
      );
    }
  }

  async reverseGeocode(lat: number, lng: number) {
    try {
      const response = await this.client.reverseGeocode({
        params: {
          latlng: { lat, lng },
          key: this.apiKey,
          language: Language.pt_BR,
        },
      });

      return response.data;
    } catch (error) {
      console.error('Erro no geocoding reverso:', error);
      throw new BadRequestException('Erro ao obter endereço das coordenadas');
    }
  }

  async getDistanceMatrix(
    origins: string[],
    destinations: string[],
    mode: TravelMode = TravelMode.walking,
  ) {
    try {
      const response = await this.client.distancematrix({
        params: {
          origins,
          destinations,
          mode,
          key: this.apiKey,
          language: Language.pt_BR,
        },
      });

      return response.data;
    } catch (error) {
      console.error('Erro na matriz de distância:', error);
      throw new BadRequestException('Erro ao calcular matriz de distância');
    }
  }

  async geocode(address: string) {
    try {
      const response = await this.client.geocode({
        params: {
          address,
          key: this.apiKey,
          language: Language.pt_BR,
        },
      });

      return response.data;
    } catch (error) {
      console.error('Erro no geocoding:', error);
      throw new BadRequestException('Erro ao obter coordenadas do endereço');
    }
  }
}
