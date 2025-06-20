import { IsString, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TravelMode } from '@googlemaps/google-maps-services-js';

export class GetRouteDto {
  @ApiProperty({
    description: 'Endereço ou coordenadas de origem',
    example: 'Rua das Flores, 123, São Paulo, SP',
  })
  @IsString()
  origin: string;

  @ApiProperty({
    description: 'Endereço ou coordenadas de destino',
    example: 'Avenida Paulista, 1000, São Paulo, SP',
  })
  @IsString()
  destination: string;

  @ApiPropertyOptional({
    description: 'Pontos intermediários separados por vírgula',
    example: 'Rua A, 100|Rua B, 200',
  })
  @IsOptional()
  @IsString()
  waypoints?: string;

  @ApiPropertyOptional({
    description: 'Modo de transporte',
    enum: ['driving', 'walking', 'bicycling', 'transit'],
    default: 'walking',
  })
  @IsOptional()
  @IsEnum(TravelMode)
  mode?: TravelMode;
}
