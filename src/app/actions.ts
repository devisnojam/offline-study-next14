"use server";

import KanbanService from "@/@services/kanban.service";

export async function getBoardDatas() {
  return KanbanService.getKanbanBoardDatas();
}
