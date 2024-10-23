import { TTicketSchema, TKanbanStackSchema } from "@/@schema/kanban.schema";
import { readJSONFileAsync, writeJSONFileAsync } from "@/@libs/file-handler";
import { InternalServerError } from "@/@libs/internal-error";
import { Throwable } from "@/@types/type";

const JSON_FILE_PATH = {
  kanbanStacks: "/static/kanban-stacks.json",
  tickets: "/static/tickets.json",
} as const;

// fixme: 함수 분리 - readFile 호출은 서비스 메소드에서 직접 호출하기
const getKanbanData = async () => {
  const [tickets, kanbanStacks] = await Promise.all([
    readJSONFileAsync(JSON_FILE_PATH.tickets),
    readJSONFileAsync(JSON_FILE_PATH.kanbanStacks),
  ]).catch((err) => {
    throw new InternalServerError({ name: "FILE_ACCESS_ERROR", message: err });
  });

  return { tickets, kanbanStacks } as {
    tickets: TTicketSchema[];
    kanbanStacks: TKanbanStackSchema[];
  };
};

export default class KanbanService {
  static async getKanbanBoards(): Promise<TKanbanStackSchema[]> {
    const { tickets, kanbanStacks } = await getKanbanData();

    const kanbanBoards = kanbanStacks.map((stack) => ({
      title: stack.title,
      status: stack.status,
      style: stack.style,
      tickets: tickets.filter((item) => item.status === stack.status),
    })) as TKanbanStackSchema[];

    return kanbanBoards;
  }

  static async getTicket(id: string): Promise<TTicketSchema> | Throwable {
    const { tickets } = await getKanbanData();
    const findedTicket = tickets.find((item) => item.id === Number(id));

    if (!findedTicket) {
      throw new InternalServerError({
        name: "TICKET_ID_NOT_EXIST",
        message: `ticket id ${id} is not exist!`,
      });
    }

    return findedTicket;
  }

  static async updateTicket(
    id: string,
    updatedData: Omit<TTicketSchema, "id" | "created_at" | "updated_at">
  ): Promise<TTicketSchema> | Throwable {
    const { tickets } = await getKanbanData();
    const findedIndex = tickets.findIndex((item) => item.id === Number(id));

    if (findedIndex === -1) {
      throw new InternalServerError({
        name: "TICKET_ID_NOT_EXIST",
        message: `ticket id ${id} is not exist!`,
      });
    }

    const updatedItem: TTicketSchema = {
      ...tickets[findedIndex],
      ...updatedData,
      updated_at: new Date().toISOString(),
    };

    tickets[findedIndex] = updatedItem;
    await writeJSONFileAsync(JSON_FILE_PATH.tickets, tickets);

    return updatedItem;
  }

  static async deleteTicket(id: string): Promise<boolean> | Throwable {
    const { tickets } = await getKanbanData();
    const findedIndex = tickets.findIndex((item) => item.id === Number(id));

    if (findedIndex === -1) {
      throw new InternalServerError({
        name: "TICKET_ID_NOT_EXIST",
        message: `ticket id ${id} is not exist!`,
      });
    }

    tickets.splice(findedIndex, 1);

    await writeJSONFileAsync(JSON_FILE_PATH.tickets, tickets);
    return true;
  }
}
