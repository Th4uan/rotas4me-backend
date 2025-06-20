import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, Matches, MaxLength } from 'class-validator';

export class SendSmsDto {
  @ApiProperty({
    description: 'Número de telefone de destino (formato internacional)',
    example: '+5511999999999',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^\+[1-9]\d{1,14}$/, {
    message:
      'Número de telefone deve estar no formato internacional (+5511999999999)',
  })
  to: string;

  @ApiProperty({
    description: 'Conteúdo da mensagem SMS',
    example: 'Sua mensagem de teste aqui',
    maxLength: 1600,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(1600, {
    message: 'Mensagem não pode exceder 1600 caracteres',
  })
  body: string;
}
