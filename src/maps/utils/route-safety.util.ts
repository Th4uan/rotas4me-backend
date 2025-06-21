import { MarkerResponseDto } from '../../marker/dto/response/marker-response.dto';
import {
  GoogleMapsDirectionsResponse,
  RoutePoint,
} from '../types/google-maps.types';

/**
 * Utilitário para cálculos de segurança de rotas
 */
export class RouteSafetyUtil {
  /**
   * Calcula a distância entre dois pontos usando a fórmula de Haversine
   * @param lat1 Latitude do primeiro ponto
   * @param lng1 Longitude do primeiro ponto
   * @param lat2 Latitude do segundo ponto
   * @param lng2 Longitude do segundo ponto
   * @returns Distância em metros
   */
  static calculateDistance(
    lat1: number,
    lng1: number,
    lat2: number,
    lng2: number,
  ): number {
    const R = 6371000;
    const dLat = this.toRadians(lat2 - lat1);
    const dLng = this.toRadians(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(lat1)) *
        Math.cos(this.toRadians(lat2)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  /**
   * Converte graus para radianos
   */
  private static toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  /**
   * Verifica se um marcador está próximo de uma rota
   * @param marker Marcador a ser verificado
   * @param routePoints Pontos da rota
   * @param maxDistance Distância máxima em metros (padrão: 500m)
   * @returns true se o marcador está próximo da rota
   */
  static isMarkerNearRoute(
    marker: MarkerResponseDto,
    routePoints: Array<{ lat: number; lng: number }>,
    maxDistance: number = 500,
  ): boolean {
    for (const point of routePoints) {
      const distance = this.calculateDistance(
        marker.latitude,
        marker.longitude,
        point.lat,
        point.lng,
      );
      if (distance <= maxDistance) {
        return true;
      }
    }
    return false;
  }

  /**
   * Filtra marcadores perigosos que estão próximos da rota
   * @param dangerousMarkers Lista de marcadores perigosos
   * @param routePoints Pontos da rota
   * @param maxDistance Distância máxima em metros
   * @returns Marcadores perigosos próximos da rota
   */
  static filterDangerousMarkersNearRoute(
    dangerousMarkers: MarkerResponseDto[],
    routePoints: Array<{ lat: number; lng: number }>,
    maxDistance: number = 500,
  ): MarkerResponseDto[] {
    return dangerousMarkers.filter((marker) =>
      this.isMarkerNearRoute(marker, routePoints, maxDistance),
    );
  }

  /**
   * Extrai pontos de coordenadas de uma rota do Google Maps
   * @param route Rota retornada pela API do Google Maps
   * @returns Array de pontos de coordenadas
   */
  static extractRoutePoints(route: GoogleMapsDirectionsResponse): RoutePoint[] {
    const points: RoutePoint[] = [];

    if (route.routes && route.routes.length > 0) {
      const mainRoute = route.routes[0];

      if (mainRoute.legs) {
        for (const leg of mainRoute.legs) {
          if (leg.steps) {
            for (const step of leg.steps) {
              if (step.start_location) {
                points.push({
                  lat: step.start_location.lat,
                  lng: step.start_location.lng,
                });
              }
              if (step.end_location) {
                points.push({
                  lat: step.end_location.lat,
                  lng: step.end_location.lng,
                });
              }
            }
          }
        }
      }
    }

    return points;
  }

  /**
   * Calcula um score de segurança para uma rota baseado nos marcadores próximos
   * @param safetyMarkers Marcadores de segurança
   * @param dangerousMarkers Marcadores perigosos
   * @param routePoints Pontos da rota
   * @returns Score de segurança (0-100, onde 100 é mais seguro)
   */
  static calculateSafetyScore(
    safetyMarkers: MarkerResponseDto[],
    dangerousMarkers: MarkerResponseDto[],
    routePoints: Array<{ lat: number; lng: number }>,
  ): number {
    const nearSafetyMarkers = this.filterDangerousMarkersNearRoute(
      safetyMarkers,
      routePoints,
      1000,
    );

    const nearDangerousMarkers = this.filterDangerousMarkersNearRoute(
      dangerousMarkers,
      routePoints,
      500,
    );

    const safetyPoints = nearSafetyMarkers.length * 10;
    const dangerPoints = nearDangerousMarkers.length * 15;

    const score = 50 + safetyPoints - dangerPoints;

    return Math.max(0, Math.min(100, score));
  }
}
