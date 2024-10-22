import { TicketDetailForm } from "@/@components/ticket";
import { kanbanItemSchema } from "@/@schema/kanban.schema";
import { APIResponseBody } from "@/@types/api.type";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
}

export default async function TicketDetailPage({ params }: Props) {
  const { id } = await params;
  const result = await fetch(`${process.env.APP_URL}/api/ticket/${id}`)
    .then((res) => res.json())
    .then((result: APIResponseBody<kanbanItemSchema>) => result);

  if (!result.success) {
    notFound();
  }

  return <TicketDetailForm formData={result.data} />;
}
