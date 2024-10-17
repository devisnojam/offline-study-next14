import { KanbanItemDetailForm } from "@/@components/kanban";
import { getTicketDetailData } from "@/app/actions";

interface Props {
  params: { id: string };
}

export default async function TicketDetailPage({ params }: Props) {
  const { id } = await params;
  const detailData = await getTicketDetailData(id);
  return <KanbanItemDetailForm formData={detailData} />;
}
