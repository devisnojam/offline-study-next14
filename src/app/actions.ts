"use server";

import KanbanService from "@/@services/kanban.service";

export async function getBoardDatas() {
  return KanbanService.getKanbanBoardDatas();
}

export async function getTicketDetailData(id: string) {
  // revalidatePath("/board", "page");
  return KanbanService.getKanbanBoardDetail(id);
}
