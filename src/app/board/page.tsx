import { KanbanGroup, KanbanItem, KanbanStack } from "@/@components/kanban";
import { TKanbanStackSchema } from "@/@schema/kanban.schema";
import { APIResponseBody } from "@/@types/type";
import { Box } from "@chakra-ui/react";
import Link from "next/link";

export default async function BoardPage() {
  const { result: kanbanBoards } = await fetch(
    `${process.env.APP_URL}/api/board`
  )
    .then((res) => res.json())
    .then((result) => result as APIResponseBody<TKanbanStackSchema[]>);

  return (
    <Box width={{ base: "full", md: "740px", lg: "900px" }} margin="0 auto">
      <KanbanGroup
        width="full"
        display="flex"
        flexDirection={{ base: "column", lg: "row" }}
      >
        {kanbanBoards.map((boardData) => (
          <KanbanStack
            key={boardData.status}
            stackTitle={boardData.title}
            titleBgColor={boardData.style.titleBgColor}
            panelBgColor={boardData.style.panelBgColor}
          >
            {boardData.tickets.map((ticket) => (
              <Link
                href={`/ticket/${ticket.id}`}
                key={ticket.id}
                style={{ width: "100%" }}
              >
                <KanbanItem key={ticket.id} ticketData={ticket} />
              </Link>
            ))}
          </KanbanStack>
        ))}
      </KanbanGroup>
    </Box>
  );
}
