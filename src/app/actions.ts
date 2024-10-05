"use server";

import { kanbanStatus } from "@/@schema/kanban.schema";
import KanbanService from "@/@services/kanban.service";
import { revalidatePath } from "next/cache";

export async function updateFormData(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  console.log("updateFormData: ", formData);
  const id = formData.get("id") as unknown as string;
  // TODO: validation

  const updatedData = {
    title: formData.get("title")! as unknown as string,
    description: formData.get("description") as unknown as string,
    due_date: formData.get("due_date") as unknown as string,
    status: formData.get("status") as kanbanStatus,
  };

  try {
    await KanbanService.updateKanbanBoardDetail(id, updatedData);
    revalidatePath("/board");

    return { message: `Item ${id} updated` };
  } catch (error) {
    console.error(error);
    return { message: `Item ${id} update failed` };
  }
}
