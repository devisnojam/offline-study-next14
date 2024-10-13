import { KanbanItemDetailForm } from "@/@components/kanban";
import StatelessModal from "@/@components/stateless-modal";
import KanbanService from "@/@services/kanban.service";

interface Props {
  params: { id: string };
}

export default async function ModalBoardDetailPage({ params }: Props) {
  const detailData = await KanbanService.getKanbanBoardDetail(params.id);

  // return (
  //   <StateModal>
  //     <RSCDataFetcher
  //       fetcher={() => KanbanService.getKanbanBoardDetail(params.id)}
  //     >
        
  //     </RSCDataFetcher>
  //   </StateModal>
  // );

  return (
    <StatelessModal open={true} title="게시글 상세">
      <KanbanItemDetailForm formData={detailData} />
    </StatelessModal>
  );
}
