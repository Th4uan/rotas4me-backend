import { BadRequestException, Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Client, TravelMode } from '@googlemaps/google-maps-services-js';
import appConfig from 'src/app/configs/app.config';

@Injectable()
export class MapsService {
  private client: Client;
  private apiKey: string;

  constructor(
    @Inject(appConfig.KEY)
    private configService: ConfigType<typeof appConfig>,
  ) {
    this.client = new Client({});
    this.apiKey = this.configService.google.apiKey as string;
  }

  async getDirections(
    origin: string,
    destination: string,
    waypoints?: string[],
    mode: TravelMode = TravelMode.walking,
  ) {
    try {
      const response = await this.client.directions({
        params: {
          origin,
          destination,
          waypoints,
          key: this.apiKey,
          mode,
        },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(`Erro ao calcular rota: ${error || 'Erro desconhecido'}`);
    }
  }

  async getMarkersNearby(location: string, radius: number, type?: string) {
    try {
      const response = await this.client.placesNearby({
        params: {
          location,
          radius,
          type,
          key: this.apiKey,
        },
      });
      return response.data;
    } catch (error: any) {
      throw new BadRequestException(
        `Erro ao buscar marcadores: ${error || 'Erro desconhecido'}`,
      );
    }
  }

  async geocodeAddress(address: string) {
    try {
      const response = await this.client.geocode({
        params: {
          address,
          key: this.apiKey,
        },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(
        `Erro ao geocodificar endereço: ${error || 'Erro desconhecido'}`,
      );
    }
  }

  async getDistanceMatrix(
    origins: string[],
    destinations: string[],
    mode: TravelMode = TravelMode.driving,
  ) {
    try {
      const response = await this.client.distancematrix({
        params: {
          origins,
          destinations,
          key: this.apiKey,
          mode,
        },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(
        `Erro ao calcular matriz de distância: ${error || 'Erro desconhecido'}`,
      );
    }
  }

  async reverseGeocode(lat: number, lng: number) {
    try {
      const response = await this.client.reverseGeocode({
        params: {
          latlng: `${lat},${lng}`,
          key: this.apiKey,
        },
      });
      return response.data;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Erro desconhecido';
      throw new Error(`Erro ao fazer geocodificação reversa: ${errorMessage}`);
    }
  }
}
