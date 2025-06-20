import {
  Controller,
  Post,
  Body,
  Get,
  BadRequestException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { SmsService } from './sms.service';
import { SendSmsDto, SmsResponseDto } from './dto';

@ApiTags('SMS')
@Controller('sms')
export class SmsController {
  constructor(private readonly smsService: SmsService) {}

  @Post('send')
  @ApiOperation({ summary: 'Enviar SMS simples' })
  @ApiBody({ type: SendSmsDto })
  @ApiResponse({
    status: 201,
    description: 'SMS enviado com sucesso',
    type: SmsResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  async sendSms(@Body() sendSmsDto: SendSmsDto): Promise<SmsResponseDto> {
    try {
      return await this.smsService.sendSms({
        to: sendSmsDto.to,
        body: sendSmsDto.body,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      throw new BadRequestException(`Erro ao enviar SMS: ${errorMessage}`);
    }
  }

  @Get('status')
  @ApiOperation({ summary: 'Verificar status do serviço SMS' })
  @ApiResponse({
    status: 200,
    description: 'Status do serviço SMS',
    schema: {
      type: 'object',
      properties: {
        isConfigured: { type: 'boolean' },
        fromNumber: { type: 'string' },
        hasCredentials: { type: 'boolean' },
        service: { type: 'string', example: 'Twilio' },
      },
    },
  })
  getServiceStatus(): {
    isConfigured: boolean;
    fromNumber: string;
    hasCredentials: boolean;
    service: string;
  } {
    const status = this.smsService.getServiceStatus();
    return {
      ...status,
      service: 'Twilio',
    };
  }
}
