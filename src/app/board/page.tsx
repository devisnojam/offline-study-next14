import { KanbanGroup, KanbanItem, KanbanStack } from "@/@components/kanban";
import { Box } from "@chakra-ui/react";
import Link from "next/link";
import { APIResponseBody } from "@/@types/api.type";
import { KanbanBoardDatas } from "@/@services/kanban.service";

// review: route caching 무효화 테스트 - 안됨
export const revalidate = 0;

export default async function BoardPage() {
  // const kanbanBoardDatas = await getBoardDatas();
  const kanbanBoardDatas = await fetch("http://localhost:3000/api/board", {
    cache: "no-store",
  })
    .then((res) => res.json())
    .then((result: APIResponseBody<KanbanBoardDatas>) => result.data);

  return (
    <Box width={{ base: "full", md: "740px", lg: "900px" }} margin="0 auto">
      <KanbanGroup
        width="full"
        display="flex"
        flexDirection={{ base: "column", lg: "row" }}
      >
        {kanbanBoardDatas.map((boardData) => (
          <KanbanStack
            key={boardData.status}
            stackTitle={boardData.title}
            titleBgColor={boardData.style.titleBgColor}
            panelBgColor={boardData.style.panelBgColor}
          >
            {boardData.items.map((item) => (
              <Link
                href={`/ticket/${item.id}`}
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
