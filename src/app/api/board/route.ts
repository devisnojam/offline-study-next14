import KanbanService from "@/@services/kanban.service";

export async function GET() {
  // TODO: try catch
  const kanbanBoardDatas = await KanbanService.getKanbanBoardDatas();
  return Response.json({
    success: true,
    message: "칸반 보드 데이터를 성공적으로 불러왔습니다.",
    data: kanbanBoardDatas,
  });
}
