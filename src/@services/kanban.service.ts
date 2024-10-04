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
}
