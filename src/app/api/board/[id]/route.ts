import KanbanService from "@/@services/kanban.service";
import { NextRequest, NextResponse } from "next/server";

interface DELETEParams {
  params: { id: string };
}

export async function DELETE(request: NextRequest, { params }: DELETEParams) {
  try {
    const { id } = params;

    await KanbanService.deleteKanbanItem(id);
    return NextResponse.json(
      { success: true, message: "Item deleted successfully" },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
