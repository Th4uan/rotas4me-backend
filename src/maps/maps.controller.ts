import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { MapsService } from './maps.service';
import { MarkerService } from '../marker/marker.service';
import { MarkerType } from '../marker/enums/marker.enum';
import {
  GetRouteDto,
  GetSafetyMarkersDto,
  GeocodeDto,
  ReverseGeocodeDto,
  DistanceMatrixDto,
  RouteResponseDto,
  SafetyMarkersResponseDto,
  AllMarkersResponseDto,
  MarkersByTypeResponseDto,
} from './dtos';
import { TravelMode } from '@googlemaps/google-maps-services-js';
import { RouteSafetyUtil } from './utils/route-safety.util';

@ApiTags('Maps')
@Controller('maps')
export class MapsController {
  constructor(
    private readonly mapsService: MapsService,
    private readonly markerService: MarkerService,
  ) {}

  @Get('route')
  @ApiOperation({ summary: 'Calcular rota evitando marcadores perigosos' })
  @ApiResponse({
    status: 200,
    description: 'Rota calculada com sucesso',
    type: RouteResponseDto,
  })
  async getRoute(@Query(ValidationPipe) query: GetRouteDto) {
    const waypointArray = query.waypoints
      ? query.waypoints.split(',')
      : undefined;

    const dangerousMarkers = await this.markerService.findByTypes([
      MarkerType.POOR_LIGHTING,
      MarkerType.SUSPECTED_DRUG_TRAFFICKING,
      MarkerType.HARASSMENT_REPORTS,
      MarkerType.UNSAFE_AREA,
      MarkerType.ISOLATED_LOCATION,
      MarkerType.HIGH_CRIME_RATE,
      MarkerType.CATCALLING_ZONE,
      MarkerType.STALKING_REPORTS,
      MarkerType.UNSAFE_BUS_STOP,
      MarkerType.NIGHT_DANGER_ZONE,
      MarkerType.WEEKEND_RISK_AREA,
      MarkerType.CONSTRUCTION_HAZARD,
      MarkerType.BROKEN_INFRASTRUCTURE,
    ]);

    const safetyMarkers = await this.markerService.findByTypes([
      MarkerType.SAFE_SPOT,
      MarkerType.POLICE_STATION,
      MarkerType.EMERGENCY_BUTTON,
      MarkerType.WOMEN_SUPPORT_CENTER,
      MarkerType.WELL_LIT_AREA,
      MarkerType.SECURITY_CAMERA,
      MarkerType.WOMEN_ONLY_SPACE,
      MarkerType.TRUSTED_ESTABLISHMENT,
      MarkerType.SAFE_TAXI_POINT,
      MarkerType.BIKE_SHARING_SAFE,
      MarkerType.METRO_SAFE_EXIT,
    ]);

    const route = await this.mapsService.getDirections(
      query.origin,
      query.destination,
      waypointArray,
      query.mode as TravelMode,
      dangerousMarkers,
    );

    const routePoints = RouteSafetyUtil.extractRoutePoints(route);
    const dangerousMarkersNearRoute =
      RouteSafetyUtil.filterDangerousMarkersNearRoute(
        dangerousMarkers,
        routePoints,
        300,
      );
    const safetyScore = RouteSafetyUtil.calculateSafetyScore(
      safetyMarkers,
      dangerousMarkers,
      routePoints,
    );

    return {
      route,
      safetyMarkers,
      dangerousMarkers,
      routeSafety: {
        safetyScore,
        dangerousMarkersNearRoute: dangerousMarkersNearRoute.length,
        safetyMarkersNearRoute: RouteSafetyUtil.filterDangerousMarkersNearRoute(
          safetyMarkers,
          routePoints,
          1000,
        ).length,
      },
    };
  }

  @Get('safety-markers')
  @ApiOperation({ summary: 'Buscar marcadores de segurança próximos' })
  @ApiResponse({
    status: 200,
    description: 'Marcadores encontrados',
    type: SafetyMarkersResponseDto,
  })
  async getSafetyMarkersNearby(
    @Query(ValidationPipe) query: GetSafetyMarkersDto,
  ) {
    const dbMarkers = await this.markerService.findNearby(
      query.lat,
      query.lng,
      query.radius || 1000,
    );

    return {
      userMarkers: dbMarkers,
      googleMarkers: [],
    };
  }

  @Get('all-markers')
  @ApiOperation({ summary: 'Buscar todos os marcadores' })
  @ApiResponse({
    status: 200,
    description: 'Todos os marcadores',
    type: AllMarkersResponseDto,
  })
  async getAllMarkers() {
    const allMarkers = await this.markerService.findAll();
    return {
      markers: allMarkers,
      total: allMarkers.length,
    };
  }

  @Get('markers-by-type')
  @ApiOperation({ summary: 'Buscar marcadores por tipo' })
  @ApiResponse({
    status: 200,
    description: 'Marcadores filtrados por tipo',
    type: MarkersByTypeResponseDto,
  })
  async getMarkersByType(@Query('types') types: string) {
    const typeArray = types.split(',') as MarkerType[];
    const markers = await this.markerService.findByTypes(typeArray);
    return {
      markers,
      total: markers.length,
      types: typeArray,
    };
  }

  @Get('geocode')
  @ApiOperation({ summary: 'Geocodificar endereço' })
  @ApiResponse({
    status: 200,
    description: 'Endereço geocodificado',
  })
  async geocodeAddress(@Query(ValidationPipe) query: GeocodeDto) {
    return await this.mapsService.geocode(query.address);
  }

  @Get('reverse-geocode')
  @ApiOperation({ summary: 'Geocodificação reversa' })
  @ApiResponse({
    status: 200,
    description: 'Coordenadas convertidas em endereço',
  })
  async reverseGeocode(@Query(ValidationPipe) query: ReverseGeocodeDto) {
    return await this.mapsService.reverseGeocode(query.lat, query.lng);
  }

  @Get('distance-matrix')
  @ApiOperation({ summary: 'Calcular matriz de distância' })
  @ApiResponse({
    status: 200,
    description: 'Matriz de distância calculada',
  })
  async getDistanceMatrix(@Query(ValidationPipe) query: DistanceMatrixDto) {
    const originsArray = query.origins.split(',');
    const destinationsArray = query.destinations.split(',');

    return await this.mapsService.getDistanceMatrix(
      originsArray,
      destinationsArray,
      query.mode as TravelMode,
    );
  }
}
