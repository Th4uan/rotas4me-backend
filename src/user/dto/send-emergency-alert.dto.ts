import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class SendEmergencyAlertDto {
  @ApiProperty({
    description: 'Tipo de emergência',
    example: 'Assalto',
    required: false,
  })
  @IsOptional()
  @IsString()
  emergencyType?: string;

  @ApiProperty({
    description: 'Localização do usuário',
    required: false,
    example: {
      lat: -23.5505,
      lng: -46.6333,
      address: 'São Paulo, SP',
    },
  })
  @IsOptional()
  userLocation?: {
    lat: number;
    lng: number;
    address?: string;
  };
}
