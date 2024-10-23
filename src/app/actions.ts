"use server";

import KanbanService from "@/@services/kanban.service";
import { Redirect } from "@/@types/type";
import { redirect, RedirectType } from "next/navigation";

export async function excuteRedirect(
  pathname: string,
  type?: keyof typeof RedirectType
): Promise<Redirect> {
  redirect(pathname, type ? RedirectType[type] : undefined);
}

export async function getBoardDatas() {
  return KanbanService.getKanbanBoards();
}

export async function getTicketDetailData(id: string) {
  return KanbanService.getTicket(id);
}
