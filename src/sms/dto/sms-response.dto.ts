import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SmsResponseDto {
  @ApiProperty({
    description: 'ID único da mensagem no Twilio',
    example: 'SM1234567890abcdef1234567890abcdef',
  })
  sid: string;

  @ApiProperty({
    description: 'Status da mensagem',
    example: 'sent',
    enum: ['queued', 'sending', 'sent', 'failed', 'delivered', 'undelivered'],
  })
  status: string;

  @ApiProperty({
    description: 'Número de telefone de destino',
    example: '+5511999999999',
  })
  to: string;

  @ApiProperty({
    description: 'Número de telefone de origem',
    example: '+5511888888888',
  })
  from: string;

  @ApiProperty({
    description: 'Conteúdo da mensagem enviada',
    example: 'Sua mensagem foi enviada com sucesso',
  })
  body: string;

  @ApiProperty({
    description: 'Data e hora de criação da mensagem',
    example: '2024-01-15T10:30:00Z',
  })
  dateCreated: Date;

  @ApiPropertyOptional({
    description: 'Código de erro (se houver)',
    example: '30008',
  })
  errorCode?: string;

  @ApiPropertyOptional({
    description: 'Mensagem de erro (se houver)',
    example: 'Unknown error',
  })
  errorMessage?: string;
}

export class EmergencyNotificationResponseDto {
  @ApiProperty({
    description: 'Número total de contatos para os quais foi tentado envio',
    example: 3,
  })
  totalContacts: number;

  @ApiProperty({
    description: 'Número de mensagens enviadas com sucesso',
    example: 2,
  })
  successfulSends: number;

  @ApiProperty({
    description: 'Número de falhas no envio',
    example: 1,
  })
  failedSends: number;

  @ApiProperty({
    description: 'Lista de respostas detalhadas de cada envio',
    type: [SmsResponseDto],
  })
  results: SmsResponseDto[];

  @ApiPropertyOptional({
    description: 'Lista de erros ocorridos durante o envio',
    type: [String],
    example: ['Falha ao enviar para João (11999999999): Invalid phone number'],
  })
  errors?: string[];

  @ApiProperty({
    description: 'Timestamp do envio da notificação',
    example: '2024-01-15T10:30:00Z',
  })
  timestamp: Date;
}
