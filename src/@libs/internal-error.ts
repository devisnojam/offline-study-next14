import { APIErrorResponseBody } from "@/@types/type";
import { StatusCodes } from "http-status-codes";

type InternalServerErrorName =
  | "FILE_ACCESS_ERROR"
  | "VALIDATION_ERROR"
  | "TICKET_ID_NOT_EXIST";

type InternalServerErrorConstructor = {
  name: InternalServerErrorName;
  message: string;
  status?: keyof typeof StatusCodes;
  options?: ErrorOptions;
};

export class InternalServerError extends Error {
  readonly status: StatusCodes;
  constructor({
    name,
    message,
    status = "INTERNAL_SERVER_ERROR",
    options,
  }: InternalServerErrorConstructor) {
    super(message, options);
    this.name = name;
    this.status = StatusCodes[status];

    // 커스텀 에러를 stack 에 추가
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

/**
 * 내부에 정의되지 않은 알수없는 에러 핸들링 시에만 사용.
 */
export class UnknownErrorHandler {
  constructor(err: unknown) {
    console.error("UnknownErrorHandler err: ", err);
    // todo: Sentry Logging
  }

  response(message?: string) {
    const body: APIErrorResponseBody = {
      success: false,
      message: message ?? "에러가 발생했습니다!\n개발팀에 문의해주세요.",
    };
    return Response.json(body, {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
    });
  }
}
