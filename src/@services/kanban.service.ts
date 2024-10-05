import { kanbanItemSchema, kanbanStackSchema } from "@/@schema/kanban.schema";
import kanbanItemsData from "@/@schema/kanban-items.json";
import kanbanStacksData from "@/@schema/kanban-stacks.json";

export default class KanbanService {
  static async getKanbanBoard() {
    const kanbanItems = kanbanItemsData as kanbanItemSchema[];
    const kanbanStacks = kanbanStacksData as Omit<kanbanStackSchema, "items">[];

    const kanbanBoard = kanbanStacks.map((stack) => ({
      ...stack,
      items: kanbanItems.filter((item) => item.status === stack.status),
    }));
    return kanbanBoard;
  }

  static async getKanbanBoardDetail(id: string) {
    const kanbanItems = kanbanItemsData as kanbanItemSchema[];
    const findedItem = kanbanItems.find((item) => item.id === Number(id));
    if (!findedItem) {
      // TODO: 에러 인스턴스 생성
      throw new Error("Item not found");
    }
    return findedItem;
  }
}
