export type TKanbanStatus = "todo" | "in_progress" | "done";

export type TTicketSchema = {
  id: number;
  status: TKanbanStatus;
  title: string;
  description?: string | undefined;
  due_date: string;
  created_at: string;
  updated_at: string;
};

export type TKanbanStackSchema = {
  title: string;
  status: TKanbanStatus;
  tickets: TTicketSchema[]
  style: {
    titleBgColor: `#${string}`;
    panelBgColor: `#${string}`;
  };
};
