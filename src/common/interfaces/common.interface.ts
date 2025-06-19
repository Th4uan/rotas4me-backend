export interface HttpExceptionResponse {
  timestamp: string;
  path: string;
  error: string;
  statusCode: number;
  message: string;
  data?: unknown;
}

export interface ExceptionResult {
  error?: string;
  message?: string;
  data?: unknown;
}
