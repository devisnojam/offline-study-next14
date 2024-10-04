import { KanbanGroup, KanbanItem, KanbanStack } from "@/@components/kanban";
import KanbanService from "@/@services/kanban.service";
import { Box } from "@chakra-ui/react";

export default async function BoardPage() {
  const kanbanBoardDatas = await KanbanService.getKanbanBoard();

  return (
    <Box width={{ base: "full", md: "900px" }} margin="0 auto">
      <KanbanGroup
        width="full"
        display="flex"
        flexDirection={{ base: "column", md: "row" }}
      >
        {kanbanBoardDatas?.map((boardData) => (
          <KanbanStack
            key={boardData.status}
            stackTitle={boardData.title}
            titleBgColor={boardData.style.titleBgColor}
            panelBgColor={boardData.style.panelBgColor}
          >
            {boardData.items.map((item) => (
              <KanbanItem key={item.id} data={item} />
            ))}
          </KanbanStack>
        ))}
      </KanbanGroup>
    </Box>
  );
}
