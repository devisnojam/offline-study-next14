"use server";

import KanbanService from "@/@services/kanban.service";
import { redirect, RedirectType } from "next/navigation";

export async function excuteRedirect(
  pathname: string,
  type?: keyof typeof RedirectType
) {
  redirect(pathname, type ? RedirectType[type] : undefined);
}

export async function getBoardDatas() {
  return KanbanService.getKanbanBoardDatas();
}

export async function getTicketDetailData(id: string) {
  // revalidatePath("/board", "page");
  return KanbanService.getKanbanBoardDetail(id);
}
