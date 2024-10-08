export type kanbanStatus = "todo" | "in_progress" | "done";

export type kanbanItemSchema = {
  id: number;
  status: kanbanStatus;
  title: string;
  description?: string | undefined;
  due_date: string;
  created_at: string;
  updated_at: string;
};

export type kanbanStackSchema = {
  title: string;
  status: kanbanStatus;
  items: kanbanItemSchema[];
  style: {
    titleBgColor: `#${string}`;
    panelBgColor: `#${string}`;
  };
};
