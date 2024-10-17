import { KanbanItemDetailForm } from "@/@components/kanban";
import { kanbanItemSchema } from "@/@schema/kanban.schema";
import { APIResponseBody } from "@/@types/api.type";

export const revalidate = 0;

interface Props {
  params: { id: string };
}

export default async function ModalTicketDetail({ params }: Props) {
  // const detailData = await getTicketDetailData(params.id);
  const { id } = await params;
  const detailData = await fetch(`http://localhost:3000/api/ticket/${id}`)
    .then((res) => res.json())
    .then((result: APIResponseBody<kanbanItemSchema>) => result.data);

  console.log("detailData: ", detailData);

  return <KanbanItemDetailForm formData={detailData} />;
}
