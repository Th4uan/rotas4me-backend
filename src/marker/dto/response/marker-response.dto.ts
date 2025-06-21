import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { MarkerType } from '../../enums/marker.enum';

export class MarkerResponseDto {
  @ApiProperty({
    description: 'ID único do marcador',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id: string;

  @ApiProperty({
    description: 'Latitude do marcador',
    example: -23.5505,
  })
  latitude: number;

  @ApiProperty({
    description: 'Longitude do marcador',
    example: -46.6333,
  })
  longitude: number;

  @ApiProperty({
    description: 'Tipo do marcador',
    enum: MarkerType,
    example: MarkerType.SAFE_SPOT,
  })
  type: MarkerType;

  @ApiPropertyOptional({
    description: 'Nome do marcador',
    example: 'Delegacia Central',
  })
  name?: string;

  @ApiProperty({
    description: 'Data de criação do marcador',
    example: '2024-01-15T10:30:00Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Data de última atualização do marcador',
    example: '2024-01-15T10:30:00Z',
  })
  updatedAt: Date;
}
