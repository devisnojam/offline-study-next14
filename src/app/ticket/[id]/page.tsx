import { KanbanItemDetailForm } from "@/@components/kanban";
import { getTicketDetailData } from "@/app/actions";

interface Props {
  params: { id: string };
}

export default async function TicketDetailPage({ params }: Props) {
  const detailData = await getTicketDetailData(params.id);
  return <KanbanItemDetailForm formData={detailData} />;
}
