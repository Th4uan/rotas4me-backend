import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsOptional,
  IsNumber,
  IsBoolean,
  IsArray,
  ValidateNested,
  Min,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ContatoEmergencia } from '../interfaces/contato-emergencia.interface';

class ContatoEmergenciaDto implements ContatoEmergencia {
  @ApiProperty({
    description: 'Nome do contato de emergência',
    example: 'Maria Silva',
  })
  @IsString()
  nome: string;

  @ApiProperty({
    description: 'Telefone do contato de emergência',
    example: '(11) 99999-9999',
  })
  @IsString()
  telefone: string;

  @ApiProperty({
    description: 'Relação com o usuário',
    example: 'Mãe',
  })
  @IsString()
  relacao: string;
}

export class CreateUserDto {
  @ApiProperty({
    description: 'Nome completo do usuário',
    example: 'Ana Carolina Santos',
  })
  @IsString()
  nome: string;

  @ApiProperty({
    description: 'Email do usuário',
    example: 'ana.santos@email.com',
  })
  @IsEmail()
  email: string;

  @ApiPropertyOptional({
    description: 'Latitude da localização do usuário',
    example: -23.5505,
    minimum: -90,
    maximum: 90,
  })
  @IsOptional()
  @IsNumber()
  @Min(-90)
  @Max(90)
  lat?: number;

  @ApiPropertyOptional({
    description: 'Longitude da localização do usuário',
    example: -46.6333,
    minimum: -180,
    maximum: 180,
  })
  @IsOptional()
  @IsNumber()
  @Min(-180)
  @Max(180)
  lng?: number;

  @ApiPropertyOptional({
    description: 'Endereço completo do usuário',
    example: 'Rua das Flores, 123 - Centro',
  })
  @IsOptional()
  @IsString()
  endereco?: string;

  @ApiPropertyOptional({
    description: 'Cidade do usuário',
    example: 'São Paulo',
  })
  @IsOptional()
  @IsString()
  cidade?: string;

  @ApiPropertyOptional({
    description: 'Estado do usuário',
    example: 'SP',
  })
  @IsOptional()
  @IsString()
  estado?: string;

  @ApiPropertyOptional({
    description: 'Telefone do usuário',
    example: '(11) 98765-4321',
  })
  @IsOptional()
  @IsString()
  telefone?: string;

  @ApiPropertyOptional({
    description: 'Lista de contatos de emergência',
    type: [ContatoEmergenciaDto],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ContatoEmergenciaDto)
  contatosEmergencia?: ContatoEmergencia[];

  @ApiPropertyOptional({
    description: 'Habilitar notificações de segurança',
    example: true,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  notificacoesSeguranca?: boolean;

  @ApiPropertyOptional({
    description: 'Permitir compartilhamento de localização',
    example: true,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  compartilharLocalizacao?: boolean;
}
