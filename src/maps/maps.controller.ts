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

@ApiTags('Maps')
@Controller('maps')
export class MapsController {
  constructor(
    private readonly mapsService: MapsService,
    private readonly markerService: MarkerService,
  ) {}

  @Get('route')
  @ApiOperation({ summary: 'Calcular rota com marcadores de segurança' })
  @ApiResponse({
    status: 200,
    description: 'Rota calculada com sucesso',
    type: RouteResponseDto,
  })
  async getRoute(@Query(ValidationPipe) query: GetRouteDto) {
    const waypointArray = query.waypoints
      ? query.waypoints.split(',')
      : undefined;

    const safetyMarkers = await this.markerService.findByTypes([
      MarkerType.SAFE_SPOT,
      MarkerType.POLICE_STATION,
      MarkerType.EMERGENCY_BUTTON,
      MarkerType.WOMEN_SUPPORT_CENTER,
      MarkerType.WELL_LIT_AREA,
      MarkerType.SECURITY_CAMERA,
      MarkerType.WOMEN_ONLY_SPACE,
      MarkerType.TRUSTED_ESTABLISHMENT,
    ]);

    const route = await this.mapsService.getDirections(
      query.origin,
      query.destination,
      waypointArray,
      query.mode as any,
    );

    return {
      route,
      safetyMarkers,
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
    const location = `${query.lat},${query.lng}`;

    const dbMarkers = await this.markerService.findNearby(
      query.lat,
      query.lng,
      query.radius || 1000,
    );

    const googleMarkers = await this.mapsService.getMarkersNearby(
      location,
      query.radius || 1000,
      'police',
    );

    return {
      userMarkers: dbMarkers,
      googleMarkers: googleMarkers.results,
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
    return await this.mapsService.geocodeAddress(query.address);
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
