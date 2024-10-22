import { kanbanItemSchema, kanbanStackSchema } from "@/@schema/kanban.schema";
import { readJSONFileAsync, writeJSONFileAsync } from "@/@libs/file-handler";
import { InternalServerError } from "@/@libs/error-handler";

type KanbanBoardData = {
  kanbanItems: kanbanItemSchema[];
  kanbanStacks: Omit<kanbanStackSchema, "items">[];
};

const getKanbanData = async () => {
  const [kanbanItems, kanbanStacks] = await Promise.all([
    readJSONFileAsync("/static/kanban-items.json"),
    readJSONFileAsync("/static/kanban-stacks.json"),
  ]).catch((err) => {
    throw new InternalServerError({ name: "FILE_ACCESS_ERROR", message: err });
  });
  return { kanbanItems, kanbanStacks } as KanbanBoardData;
};

export type KanbanBoardDatas = kanbanStackSchema[];
export default class KanbanService {
  static async getKanbanBoardDatas() {
    const { kanbanItems, kanbanStacks } = await getKanbanData();
    const kanbanBoardDatas = kanbanStacks.map((stack) => ({
      style: stack.style,
      title: stack.title,
      status: stack.status,
      items: kanbanItems.filter((item) => item.status === stack.status),
    }));

    return kanbanBoardDatas;
  }

  static async getKanbanBoardDetail(id: string) {
    const { kanbanItems } = await getKanbanData();
    const findedItem = kanbanItems.find((item) => item.id === Number(id));

    if (!findedItem) return null;

    return findedItem;
  }

  static async updateKanbanBoardDetail(
    id: string,
    updatedData: Omit<kanbanItemSchema, "id" | "created_at" | "updated_at">
  ) {
    const { kanbanItems } = await getKanbanData();
    const findedIndex = kanbanItems.findIndex((item) => item.id === Number(id));
    if (findedIndex === -1) {
      // TODO: 에러 인스턴스 생성
      throw new Error("Item not found");
    }

    const updatedItem: kanbanItemSchema = {
      ...kanbanItems[findedIndex],
      ...updatedData,
      updated_at: new Date().toISOString(),
    };

    kanbanItems[findedIndex] = updatedItem;

    await writeJSONFileAsync("/static/kanban-items.json", kanbanItems);
    return updatedItem;
  }

  static async deleteKanbanItem(id: string) {
    const { kanbanItems } = await getKanbanData();
    const findedIndex = kanbanItems.findIndex((item) => item.id === Number(id));
    if (findedIndex === -1) {
      // TODO: 에러 인스턴스 생성
      throw new Error("Item not found");
    }

    kanbanItems.splice(findedIndex, 1);

    await writeJSONFileAsync("/static/kanban-items.json", kanbanItems);
    return true;
  }
}
