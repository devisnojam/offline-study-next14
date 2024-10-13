import { StatusCodes } from 'http-status-codes';

export interface ErrorResponse {
  message: string;
  status: number;
  stack?: string;
}

export class ServerError extends Error {
  status: number;
  
  constructor(message: string, status: number = StatusCodes.INTERNAL_SERVER_ERROR) {
    super(message);
    this.name = 'ServerError';
    this.status = status;
  }
}

export function handleError(
  error: Error,
  message: string = '서버 오류가 발생했습니다.',
  statusCode: number = StatusCodes.INTERNAL_SERVER_ERROR
): Response {
  console.error(error);

  const errorResponse: ErrorResponse = {
    message,
    status: statusCode,
  };

  if (process.env.NODE_ENV !== 'production') {
    errorResponse.stack = error.stack;
  }

  return Response.json(errorResponse, { status: statusCode });
}

export function isServerError(error: unknown): error is ServerError {
  return error instanceof ServerError;
}
