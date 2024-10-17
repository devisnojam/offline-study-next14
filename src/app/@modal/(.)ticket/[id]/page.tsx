import { KanbanItemDetailForm } from "@/@components/kanban";
import KanbanService from "@/@services/kanban.service";

interface Props {
  params: { id: string };
}

export default async function ModalTicketDetail({ params }: Props) {
  console.log("Modal-TicketDetail");

  const detailData = await KanbanService.getKanbanBoardDetail(params.id);

  return <KanbanItemDetailForm formData={detailData} />;
}
