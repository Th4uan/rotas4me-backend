import { Injectable, Inject, Logger } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Twilio } from 'twilio';
import appConfig from '../app/configs/app.config';
import {
  TwilioConfig,
  SmsMessage,
  SmsResponse,
  EmergencyNotificationData,
} from './interfaces';
import { TwilioResponseMapper } from './utils/twilio-response-mapper';
import { ContatoEmergencia } from '../user/interfaces';

@Injectable()
export class SmsService {
  private readonly logger = new Logger(SmsService.name);
  private readonly twilioClient: Twilio;
  private readonly config: TwilioConfig;

  constructor(
    @Inject(appConfig.KEY)
    private readonly appConfiguration: ConfigType<typeof appConfig>,
  ) {
    this.config = {
      accountSid: this.appConfiguration.twilio.accountSid || '',
      authToken: this.appConfiguration.twilio.authToken || '',
      fromNumber: this.appConfiguration.twilio.fromNumber || '',
    };

    if (
      !this.config.accountSid ||
      !this.config.authToken ||
      this.config.accountSid === 'your_twilio_account_sid_here' ||
      this.config.authToken === 'your_twilio_auth_token_here'
    ) {
      this.logger.warn(
        'Twilio credentials not configured properly. SMS functionality will be disabled.',
      );
      return;
    }

    try {
      this.twilioClient = new Twilio(
        this.config.accountSid,
        this.config.authToken,
      );
      this.logger.log('Twilio SMS service initialized successfully');
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      this.logger.error('Failed to initialize Twilio client:', errorMessage);
      this.logger.warn('SMS functionality will be disabled.');
    }
  }

  private isConfigValid(): boolean {
    return !!(
      this.config.accountSid &&
      this.config.authToken &&
      this.config.fromNumber
    );
  }

  async sendSms(message: SmsMessage): Promise<SmsResponse> {
    if (!this.isConfigValid()) {
      throw new Error('Configuração do Twilio não está válida');
    }

    try {
      const result = await this.twilioClient.messages.create({
        body: message.body,
        from: this.config.fromNumber,
        to: message.to,
      });

      this.logger.log(
        `SMS enviado com sucesso para ${message.to}. SID: ${result.sid}`,
      );

      // Validar se a resposta do Twilio é válida
      if (!TwilioResponseMapper.isValidTwilioResponse(result)) {
        throw new Error('Resposta inválida do Twilio');
      }

      // Mapear de forma segura usando o mapper
      return TwilioResponseMapper.mapToSmsResponse(
        result,
        this.config.fromNumber,
      );
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`Erro ao enviar SMS para ${message.to}:`, errorMessage);
      throw new Error(`Falha ao enviar SMS: ${errorMessage}`);
    }
  }

  async sendEmergencyNotification(
    contatosEmergencia: ContatoEmergencia[],
    emergencyData: EmergencyNotificationData,
  ): Promise<SmsResponse[]> {
    if (!contatosEmergencia || contatosEmergencia.length === 0) {
      throw new Error('Nenhum contato de emergência fornecido');
    }

    const messageBody = this.buildEmergencyMessage(emergencyData);
    const results: SmsResponse[] = [];
    const errors: string[] = [];

    for (const contato of contatosEmergencia) {
      try {
        const result = await this.sendSms({
          to: contato.telefone,
          body: messageBody,
        });
        results.push(result);
        this.logger.log(
          `Notificação de emergência enviada para ${contato.nome} (${contato.telefone})`,
        );
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : 'Unknown error';
        const errorMsg = `Falha ao enviar para ${contato.nome} (${contato.telefone}): ${errorMessage}`;
        errors.push(errorMsg);
        this.logger.error(errorMsg);
      }
    }

    if (errors.length > 0 && results.length === 0) {
      throw new Error(
        `Falha ao enviar todas as notificações: ${errors.join('; ')}`,
      );
    }

    if (errors.length > 0) {
      this.logger.warn(`Algumas notificações falharam: ${errors.join('; ')}`);
    }

    return results;
  }

  private buildEmergencyMessage(data: EmergencyNotificationData): string {
    let message = `🚨 ALERTA DE EMERGÊNCIA 🚨\n\n`;
    message += `${data.userName} acionou um alerta de emergência.\n`;
    message += `Horário: ${data.timestamp.toLocaleString('pt-BR')}\n`;

    if (data.emergencyType) {
      message += `Tipo: ${data.emergencyType}\n`;
    }

    if (data.userLocation) {
      message += `\nLocalização:\n`;
      if (data.userLocation.address) {
        message += `Endereço: ${data.userLocation.address}\n`;
      }
      message += `Coordenadas: ${data.userLocation.lat}, ${data.userLocation.lng}\n`;
      message += `Google Maps: https://maps.google.com/?q=${data.userLocation.lat},${data.userLocation.lng}\n`;
    }

    message += `\nEsta é uma mensagem automática do sistema Rotas4Me.`;
    message += `\nSe esta for uma emergência real, entre em contato imediatamente com os serviços de emergência (190/192/193).`;

    return message;
  }

  async sendBulkSms(messages: SmsMessage[]): Promise<SmsResponse[]> {
    const results: SmsResponse[] = [];
    const errors: string[] = [];

    for (const message of messages) {
      try {
        const result = await this.sendSms(message);
        results.push(result);
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : 'Unknown error';
        errors.push(`Falha para ${message.to}: ${errorMessage}`);
      }
    }

    if (errors.length > 0) {
      this.logger.warn(`Algumas mensagens falharam: ${errors.join('; ')}`);
    }

    return results;
  }

  getServiceStatus(): {
    isConfigured: boolean;
    fromNumber: string;
    hasCredentials: boolean;
  } {
    return {
      isConfigured: this.isConfigValid(),
      fromNumber: this.config.fromNumber,
      hasCredentials: !!(this.config.accountSid && this.config.authToken),
    };
  }
}
