import { KanbanItemDetailForm } from "@/@components/kanban";
import { kanbanItemSchema } from "@/@schema/kanban.schema";
import { APIResponseBody } from "@/@types/api.type";
import { notFound } from "next/navigation";

export const revalidate = 0;

interface Props {
  params: { id: string };
}

export default async function ModalTicketDetail({ params }: Props) {
  const { id } = await params;
  const result = await fetch(`http://localhost:3000/api/ticket/${id}`)
    .then((res) => res.json())
    .then((result: APIResponseBody<kanbanItemSchema>) => result);

  if (!result.success) {
    notFound();
  }

  return <KanbanItemDetailForm formData={result.data} />;
}
