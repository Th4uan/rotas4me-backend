import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import {
  ExceptionResult,
  HttpExceptionResponse,
} from '../interfaces/common.interface';

@Catch()
export class ErrorExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionResponse =
      exception instanceof HttpException
        ? exception.getResponse()
        : { message: exception.message };

    const result: ExceptionResult =
      typeof exceptionResponse === 'string'
        ? { message: exceptionResponse }
        : (exceptionResponse as ExceptionResult);

    if (request.url.includes('/health')) {
      response.status(status).json(result);
      return;
    }

    if (exception.name === 'EntityNotFoundError') {
      const type = exception.message
        .split(' matching: ')[0]
        .replace(/"/g, '')
        .trim();

      const data: HttpExceptionResponse = {
        timestamp: new Date().toISOString(),
        path: decodeURIComponent(request.url),
        error: 'Not Found',
        statusCode: HttpStatus.NOT_FOUND,
        message: `Could not find any entity of type ${type}`,
      };

      response.status(HttpStatus.NOT_FOUND).json(data);
      return;
    }

    if (status >= 500) {
      const error = HttpStatus[status] || 'Server Error';
      const data: HttpExceptionResponse = {
        timestamp: new Date().toISOString(),
        path: decodeURIComponent(request.url),
        error,
        statusCode: status,
        message: error,
      };

      console.error(`[ERROR] ${exception.message}`, exception.stack);

      response.status(status).json(data);
      return;
    }

    const data: HttpExceptionResponse = {
      timestamp: new Date().toISOString(),
      path: decodeURIComponent(request.url),
      error: result?.error || result?.message || status.toString(),
      statusCode: status,
      message: result.message || 'Erro desconhecido',
    };

    if (result?.data) {
      data.data = result.data;
    }

    if (status >= 500) {
      console.error(`[ERROR] ${JSON.stringify(data)}`, exception.stack);
    }

    response.status(status).json(data);
  }
}
