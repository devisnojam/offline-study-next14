import StatelessModal from "@/@components/stateless-modal";
import ItemDetailForm from "@/app/@modal/(.)board/[id]/item-detail-form";
import KanbanService from "@/@services/kanban.service";

interface Props {
  params: { id: string };
}

export default async function ModalBoardDetail({ params }: Props) {
  const detailData = await KanbanService.getKanbanBoardDetail(params.id);

  return (
    <StatelessModal title="게시글 상세">
      <ItemDetailForm formData={detailData} />
    </StatelessModal>
  );
}
