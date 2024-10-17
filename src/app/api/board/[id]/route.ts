import KanbanService from "@/@services/kanban.service";
import { kanbanItemValidationSchema } from "@/@validations/kanban-item.validation";
import { ZodError } from "zod";

interface Params {
  params: { id: string };
}

export async function PUT(request: Request, { params }: Params) {
  try {
    const { id } = params;
    const formData = await request.json();

    const validatedData = kanbanItemValidationSchema.parse(formData);
    const updatedResult = await KanbanService.updateKanbanBoardDetail(
      id,
      validatedData
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
    if (error instanceof ZodError) {
      return Response.json(
        { success: false, message: error.message, errors: error.errors },
        { status: 400 }
      );
    }
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
