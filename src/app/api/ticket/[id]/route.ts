import {
  InternalServerError,
  UnknownErrorHandler,
} from "@/@libs/internal-error";
import KanbanService from "@/@services/kanban.service";
import { APIErrorResponseBody, APIResponseBody } from "@/@types/type";
import { kanbanItemValidationSchema } from "@/@validations/kanban-item.validation";
import { StatusCodes } from "http-status-codes";
import { ZodError } from "zod";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, { params }: Params) {
  try {
    const { id } = await params; // next 15 params 방식 변경
    const ticket = await KanbanService.getTicket(id);

    const body: APIResponseBody<typeof ticket> = {
      success: true,
      message: "티켓 데이터 조회에 성공했습니다.",
      result: ticket,
    };

    return Response.json(body, { status: StatusCodes.OK });
  } catch (error: unknown) {
    if (error instanceof InternalServerError) {
      return Response.json(
        { success: false, message: error.message },
        { status: error.status }
      );
    }
    return new UnknownErrorHandler(error).response();
  }
}

export async function PUT(request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const formData = await request.json();

    const validatedData = kanbanItemValidationSchema.parse(formData);
    const updatedResult = await KanbanService.updateTicket(id, validatedData);

    const body: APIResponseBody<typeof updatedResult> = {
      success: true,
      message: "티켓 데이터가 수정되었습니다.",
      result: updatedResult,
    };

    return Response.json(body, { status: 200 });
  } catch (error: unknown) {
    const errBody: APIErrorResponseBody = { success: false, message: "Error" };

    if (error instanceof ZodError) {
      return Response.json(errBody, {
        status: StatusCodes.BAD_REQUEST,
      });
    }
    if (error instanceof InternalServerError) {
      errBody.message = error.message;
      return Response.json(errBody, { status: error.status });
    }
    return new UnknownErrorHandler(error).response();
  }
}

export async function DELETE(request: Request, { params }: Params) {
  try {
    const { id } = await params;
    await KanbanService.deleteTicket(id);

    const body: APIResponseBody<null> = {
      success: true,
      message: "해당 티켓이 삭제되었습니다.",
      result: null,
    };

    return Response.json(body, { status: 200 });
  } catch (error: unknown) {
    const errBody: APIErrorResponseBody = { success: false, message: "Error" };

    if (error instanceof ZodError) {
      return Response.json(errBody, {
        status: StatusCodes.BAD_REQUEST,
      });
    }
    if (error instanceof InternalServerError) {
      errBody.message = error.message;
      return Response.json(errBody, { status: error.status });
    }
    return new UnknownErrorHandler(error).response();
  }
}
