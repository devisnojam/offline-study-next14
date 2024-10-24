import { UnknownErrorHandler } from "@/@libs/internal-error";
import KanbanService from "@/@services/kanban.service";
import { APIResponseBody } from "@/@types/server-response.type";
import { StatusCodes } from "http-status-codes";

export async function GET() {
  try {
    const kanbanBoards = await KanbanService.getKanbanBoards();
    const body: APIResponseBody<typeof kanbanBoards> = {
      success: true,
      message: "칸반 보드 데이터를 성공적으로 불러왔습니다.",
      result: kanbanBoards,
    };

    return Response.json(body, { status: StatusCodes.OK });
  } catch (error: unknown) {
    return new UnknownErrorHandler(error).response();
  }
}
