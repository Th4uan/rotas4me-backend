import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsOptional,
  Min,
  Max,
} from 'class-validator';

export class GetNearbyMarkersDto {
  @ApiProperty({
    description: 'Latitude da localização central',
    example: -23.5505,
    minimum: -90,
    maximum: 90,
  })
  @IsLatitude()
  @Type(() => Number)
  lat: number;

  @ApiProperty({
    description: 'Longitude da localização central',
    example: -46.6333,
    minimum: -180,
    maximum: 180,
  })
  @IsLongitude()
  @Type(() => Number)
  lng: number;

  @ApiPropertyOptional({
    description: 'Raio de busca em metros',
    example: 1000,
    minimum: 1,
    maximum: 50000,
    default: 1000,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(50000)
  @Type(() => Number)
  radius?: number = 1000;
}
