import { KanbanItemDetailForm } from "@/@components/kanban";
import { getTicketDetailData } from "@/app/actions";

interface Props {
  params: { id: string };
}

export default async function ModalTicketDetail({ params }: Props) {
  const detailData = await getTicketDetailData(params.id);
  console.log("detailData: ", detailData);

  return <KanbanItemDetailForm formData={detailData} />;
}
