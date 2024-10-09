import { KanbanItemDetailForm } from "@/@components/kanban";
import StatelessModal from "@/@components/stateless-modal";
import KanbanService from "@/@services/kanban.service";

interface Props {
  params: { id: string };
}

export default async function ModalBoardDetail({ params }: Props) {
  const detailData = await KanbanService.getKanbanBoardDetail(params.id);

  return (
    <StatelessModal title="게시글 상세">
      <KanbanItemDetailForm formData={detailData} />
    </StatelessModal>
  );
}
