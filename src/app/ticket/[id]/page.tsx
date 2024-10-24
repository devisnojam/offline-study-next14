import { TicketDetailForm } from "@/@components/ticket";
import { TTicketSchema } from "@/@types/schema.type";
import { APIResponseBody } from "@/@types/server-response.type";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function TicketDetailPage({ params }: Props) {
  const { id } = await params;
  const { result } = await fetch(`${process.env.APP_URL}/api/ticket/${id}`)
    .then((res) => res.json())
    .then((result: APIResponseBody<TTicketSchema>) => result);

  return <TicketDetailForm formData={result!} />;
}
