import KanbanService from "@/@services/kanban.service";
import { kanbanItemValidationSchema } from "@/@validations/kanban-item.validation";
import { parseForm } from "react-zorm";

export interface APIResponseSchema<T> {
  success: boolean;
  message: string;
  data?: T;
}

interface Params {
  params: { id: string };
}

export async function PUT(request: Request, { params }: Params) {
  try {
    const { id } = params;
    const formData = await request.formData();
    const updatedData = parseForm(kanbanItemValidationSchema, formData);
    const updatedResult = await KanbanService.updateKanbanBoardDetail(
      id,
      updatedData
    );

    return Response.json(
      {
        success: true,
        data: updatedResult,
        message: "Item updated successfully",
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return Response.json(
        { success: false, message: error.message },
        { status: 500 }
      );
    }
    return Response.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: Params) {
  try {
    const { id } = params;

    await KanbanService.deleteKanbanItem(id);
    return Response.json(
      { success: true, message: "Item deleted successfully" },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return Response.json(
        { success: false, message: error.message },
        { status: 500 }
      );
    }
    return Response.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
