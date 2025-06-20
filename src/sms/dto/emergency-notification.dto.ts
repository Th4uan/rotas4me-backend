import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsUUID,
  ValidateNested,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';

export enum EmergencyType {
  GENERAL = 'GERAL',
  HARASSMENT = 'ASSEDIO',
  STALKING = 'PERSEGUICAO',
  VIOLENCE = 'VIOLENCIA',
  MEDICAL = 'MEDICA',
  ACCIDENT = 'ACIDENTE',
  OTHER = 'OUTRO',
}

export class LocationDto {
  @ApiProperty({
    description: 'Latitude da localização',
    example: -23.5505,
  })
  @IsNumber()
  lat: number;

  @ApiProperty({
    description: 'Longitude da localização',
    example: -46.6333,
  })
  @IsNumber()
  lng: number;

  @ApiPropertyOptional({
    description: 'Endereço da localização',
    example: 'Rua das Flores, 123 - Centro, São Paulo - SP',
  })
  @IsOptional()
  @IsString()
  address?: string;
}

export class SendEmergencyNotificationDto {
  @ApiProperty({
    description: 'ID do usuário que está enviando a notificação',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @ApiPropertyOptional({
    description: 'Tipo de emergência',
    enum: EmergencyType,
    example: EmergencyType.GENERAL,
  })
  @IsOptional()
  @IsEnum(EmergencyType)
  emergencyType?: EmergencyType;

  @ApiPropertyOptional({
    description: 'Localização atual do usuário',
    type: LocationDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => LocationDto)
  location?: LocationDto;

  @ApiPropertyOptional({
    description: 'Mensagem adicional personalizada',
    example: 'Preciso de ajuda urgente!',
  })
  @IsOptional()
  @IsString()
  customMessage?: string;
}
