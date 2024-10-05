import { KanbanGroup, KanbanItem, KanbanStack } from "@/@components/kanban";
import KanbanService from "@/@services/kanban.service";
import { Box } from "@chakra-ui/react";
import Link from "next/link";

export default async function BoardPage() {
  const kanbanBoardDatas = await KanbanService.getKanbanBoard();

  return (
    <Box width={{ base: "full", md: "740px", lg: "900px" }} margin="0 auto">
      <KanbanGroup
        width="full"
        display="flex"
        flexDirection={{ base: "column", lg: "row" }}
      >
        {kanbanBoardDatas?.map((boardData) => (
          <KanbanStack
            key={boardData.status}
            stackTitle={boardData.title}
            titleBgColor={boardData.style.titleBgColor}
            panelBgColor={boardData.style.panelBgColor}
          >
            {boardData.items.map((item) => (
              <Link
                href={`/board/${item.id}`}
                key={item.id}
                style={{ width: "100%" }}
              >
                <KanbanItem key={item.id} data={item} />
              </Link>
            ))}
          </KanbanStack>
        ))}
      </KanbanGroup>
    </Box>
  );
}
