import { KanbanItemDetailForm } from "@/@components/kanban";
import KanbanService from "@/@services/kanban.service";
import { Box, Container, Heading } from "@chakra-ui/react";

interface BoardDetailPageProps {
  params: { id: string };
}

export default async function BoardDetailPage({
  params,
}: BoardDetailPageProps) {
  const detailData = await KanbanService.getKanbanBoardDetail(params.id);

  return (
    <Container>
      <Box as="header" padding={4}>
        <Heading size="md" textAlign="center">
          게시글 상세
        </Heading>
      </Box>
      <KanbanItemDetailForm formData={detailData} />
    </Container>
  );
}
