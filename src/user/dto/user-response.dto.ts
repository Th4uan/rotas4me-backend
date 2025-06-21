import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ContatoEmergencia } from '../interfaces/contato-emergencia.interface';

export class UserResponseDto {
  @ApiProperty({
    description: 'ID único do usuário',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'Nome completo do usuário',
    example: 'Ana Carolina Santos',
  })
  nome: string;

  @ApiProperty({
    description: 'Email do usuário',
    example: 'ana.santos@email.com',
  })
  email: string;

  @ApiPropertyOptional({
    description: 'Latitude da localização do usuário',
    example: -23.5505,
  })
  lat?: number;

  @ApiPropertyOptional({
    description: 'Longitude da localização do usuário',
    example: -46.6333,
  })
  lng?: number;

  @ApiPropertyOptional({
    description: 'Endereço completo do usuário',
    example: 'Rua das Flores, 123 - Centro',
  })
  endereco?: string;

  @ApiPropertyOptional({
    description: 'Cidade do usuário',
    example: 'São Paulo',
  })
  cidade?: string;

  @ApiPropertyOptional({
    description: 'Estado do usuário',
    example: 'SP',
  })
  estado?: string;

  @ApiPropertyOptional({
    description: 'Telefone do usuário',
    example: '(11) 98765-4321',
  })
  telefone?: string;

  @ApiPropertyOptional({
    description: 'Lista de contatos de emergência',
    example: [
      {
        nome: 'Maria Silva',
        telefone: '(11) 99999-9999',
        relacao: 'Mãe',
      },
    ],
  })
  contatosEmergencia?: ContatoEmergencia[];

  @ApiProperty({
    description: 'Status das notificações de segurança',
    example: true,
  })
  notificacoesSeguranca: boolean;

  @ApiProperty({
    description: 'Status do compartilhamento de localização',
    example: true,
  })
  compartilharLocalizacao: boolean;

  @ApiProperty({
    description: 'Data de criação do usuário',
    example: '2024-01-15T10:30:00Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Data da última atualização',
    example: '2024-01-15T10:30:00Z',
  })
  updatedAt: Date;
}
