import KanbanService from "@/@services/kanban.service";

interface BoardDetailPageProps {
  params: { id: string };
}

export default async function BoardDetailPage({
  params,
}: BoardDetailPageProps) {
  const detailData = await KanbanService.getKanbanBoardDetail(params.id);
  console.log("BoardDetailPage detailData: ", detailData);

  return <div>{detailData.title}</div>;
}
