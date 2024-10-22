import { StatusCodes } from "http-status-codes";

type InternalServerErrorName = "FILE_ACCESS_ERROR" | "VALIDATION_ERROR";

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
  }
}
