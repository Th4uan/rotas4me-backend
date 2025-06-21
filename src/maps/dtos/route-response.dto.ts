import { ApiProperty } from '@nestjs/swagger';
import { MarkerResponseDto } from '../../marker/dto/response/marker-response.dto';

export class GoogleRouteDto {
  @ApiProperty({
    description: 'Array de rotas calculadas',
    example: [
      {
        legs: [
          {
            distance: { text: '5.2 km', value: 5200 },
            duration: { text: '12 mins', value: 720 },
            start_address: 'Rua A, São Paulo',
            end_address: 'Rua B, São Paulo',
          },
        ],
        overview_polyline: {
          points: 'encoded_polyline_string',
        },
      },
    ],
  })
  routes: Array<{
    legs: Array<{
      distance: { text: string; value: number };
      duration: { text: string; value: number };
      start_address: string;
      end_address: string;
    }>;
    overview_polyline: {
      points: string;
    };
  }>;

  @ApiProperty({
    description: 'Status da resposta',
    example: 'OK',
  })
  status: string;
}

export class RouteResponseDto {
  @ApiProperty({
    description: 'Rota calculada pelo Google Maps',
    type: GoogleRouteDto,
  })
  route: GoogleRouteDto;

  @ApiProperty({
    description: 'Marcadores de segurança encontrados',
    type: [MarkerResponseDto],
  })
  safetyMarkers: MarkerResponseDto[];

  @ApiProperty({
    description: 'Marcadores perigosos que foram evitados na rota',
    type: [MarkerResponseDto],
    required: false,
  })
  dangerousMarkers?: MarkerResponseDto[];

  @ApiProperty({
    description: 'Informações de segurança da rota',
    example: {
      safetyScore: 75,
      dangerousMarkersNearRoute: 2,
      safetyMarkersNearRoute: 5,
    },
    required: false,
  })
  routeSafety?: {
    safetyScore: number;
    dangerousMarkersNearRoute: number;
    safetyMarkersNearRoute: number;
  };
}

export class GooglePlaceMarkerDto {
  @ApiProperty({
    description: 'ID único do lugar no Google Places',
    example: 'ChIJN1t_tDeuEmsRUsoyG83frY4',
  })
  place_id: string;

  @ApiProperty({
    description: 'Nome do estabelecimento',
    example: 'Posto Policial',
  })
  name: string;

  @ApiProperty({
    description: 'Geometria do lugar',
    example: {
      location: {
        lat: -23.5505,
        lng: -46.6333,
      },
    },
  })
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };

  @ApiProperty({
    description: 'Tipos do lugar',
    example: ['police', 'establishment'],
  })
  types: string[];

  @ApiProperty({
    description: 'Rating do lugar',
    example: 4.2,
    required: false,
  })
  rating?: number;
}

export class SafetyMarkersResponseDto {
  @ApiProperty({
    description: 'Marcadores do banco de dados',
    type: [MarkerResponseDto],
  })
  databaseMarkers: MarkerResponseDto[];

  @ApiProperty({
    description: 'Marcadores do Google Places',
    type: [GooglePlaceMarkerDto],
  })
  googleMarkers: GooglePlaceMarkerDto[];
}

export class AllMarkersResponseDto {
  @ApiProperty({
    description: 'Todos os marcadores do banco de dados',
    type: [MarkerResponseDto],
  })
  markers: MarkerResponseDto[];
}

export class MarkersByTypeResponseDto {
  @ApiProperty({
    description: 'Marcadores filtrados por tipo',
    type: [MarkerResponseDto],
  })
  markers: MarkerResponseDto[];
}
