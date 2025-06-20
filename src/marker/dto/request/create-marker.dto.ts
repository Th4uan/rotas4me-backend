import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsLatitude,
  IsLongitude,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { MarkerType } from '../../enums/marker.enum';

export class CreateMarkerDto {
  @ApiProperty({
    description: 'Latitude do marcador',
    example: -23.5505,
    minimum: -90,
    maximum: 90,
  })
  @IsLatitude()
  latitude: number;

  @ApiProperty({
    description: 'Longitude do marcador',
    example: -46.6333,
    minimum: -180,
    maximum: 180,
  })
  @IsLongitude()
  longitude: number;

  @ApiProperty({
    description: 'Tipo do marcador',
    enum: MarkerType,
    example: MarkerType.SAFE_SPOT,
  })
  @IsEnum(MarkerType)
  type: MarkerType;

  @ApiPropertyOptional({
    description: 'Nome do marcador',
    example: 'Delegacia Central',
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  name?: string;
}
