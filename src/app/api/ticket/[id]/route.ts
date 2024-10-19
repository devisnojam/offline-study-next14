import KanbanService from "@/@services/kanban.service";
import { kanbanItemValidationSchema } from "@/@validations/kanban-item.validation";
import { revalidatePath } from "next/cache";
import { notFound } from "next/navigation";
import { ZodError } from "zod";

interface Params {
  params: { id: string };
}

export async function GET(request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const detailData = await KanbanService.getKanbanBoardDetail(id);
    if (!detailData) {
      notFound();
    }
    return Response.json({
      success: true,
      message: "티켓 상세 데이터를 성공적으로 불러왔습니다.",
      data: detailData,
    });
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

export async function PUT(request: Request, { params }: Params) {
  try {
    const { id } = await params;
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
    revalidatePath(`/ticket/${id}`);
    return Response.json(
      { success: true, message: "해당 티켓이 삭제되었습니다." },
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
