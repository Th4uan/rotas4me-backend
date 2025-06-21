import { TwilioMessageResponse } from '../interfaces/twilio-message-response.interface';
import { SmsResponse } from '../interfaces/twilio-config.interface';

export class TwilioResponseMapper {
  /**
   * Mapeia de forma segura a resposta do Twilio para nossa interface SmsResponse
   * @param twilioResponse - Resposta do Twilio (tipada)
   * @param fallbackFromNumber - Número de origem como fallback
   * @returns SmsResponse tipado e seguro
   */
  static mapToSmsResponse(
    twilioResponse: TwilioMessageResponse,
    fallbackFromNumber: string,
  ): SmsResponse {
    return {
      sid: twilioResponse.sid,
      status: twilioResponse.status,
      to: twilioResponse.to,
      from: twilioResponse.from ?? fallbackFromNumber,
      body: twilioResponse.body,
      dateCreated: twilioResponse.dateCreated,
      errorCode: twilioResponse.errorCode?.toString() ?? undefined,
      errorMessage: twilioResponse.errorMessage ?? undefined,
    };
  }

  /**
   * Valida se a resposta do Twilio contém os campos obrigatórios
   * @param response - Resposta a ser validada
   * @returns true se válida, false caso contrário
   */
  static isValidTwilioResponse(
    response: TwilioMessageResponse,
  ): response is TwilioMessageResponse {
    if (!response || typeof response !== 'object') {
      return false;
    }

    return (
      typeof response.sid === 'string' &&
      typeof response.status === 'string' &&
      typeof response.to === 'string' &&
      typeof response.body === 'string' &&
      response.dateCreated instanceof Date
    );
  }

  /**
   * Extrai informações de erro de forma segura
   * @param response - Resposta do Twilio
   * @returns Objeto com informações de erro ou null
   */
  static extractErrorInfo(response: TwilioMessageResponse): {
    code?: string;
    message?: string;
  } | null {
    if (!response.errorCode && !response.errorMessage) {
      return null;
    }

    return {
      code: response.errorCode?.toString(),
      message: response.errorMessage ?? undefined,
    };
  }
}
