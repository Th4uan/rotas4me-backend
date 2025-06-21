import { IsString, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TravelMode } from '@googlemaps/google-maps-services-js';

export class DistanceMatrixDto {
  @ApiProperty({
    description: 'Origens separadas por vírgula',
    example: 'São Paulo, SP|Rio de Janeiro, RJ',
  })
  @IsString()
  origins: string;

  @ApiProperty({
    description: 'Destinos separados por vírgula',
    example: 'Brasília, DF|Belo Horizonte, MG',
  })
  @IsString()
  destinations: string;

  @ApiPropertyOptional({
    description: 'Modo de transporte',
    enum: ['driving', 'walking', 'bicycling', 'transit'],
    default: 'driving',
  })
  @IsOptional()
  @IsEnum(TravelMode)
  mode?: TravelMode;
}
