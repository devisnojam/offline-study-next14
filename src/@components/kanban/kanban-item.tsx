"use client";

import { kanbanItemSchema } from "@/@schema/kanban.schema";
import { Box, IconButton, Text, useDisclosure } from "@chakra-ui/react";
import Image from "next/image";
import ConfirmDialog from "../confirm-dialog";

interface Props {
  data: kanbanItemSchema;
}

export default function KanbanItem({ data }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleClickDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onOpen();
  };

  const deleteItem = async () => {
    const response = await fetch(`/api/board/${data.id}`, {
      method: "DELETE",
    });
    const result = await response.json();

    if (result.success) {
      console.log(result.message);
      onClose();
    } else {
      console.error(result.message);
    }
  };

  return (
    <>
      <Box
        width="full"
        height={14}
        px={3}
        py={3.5}
        borderRadius={3}
        bgColor="#F3F3F3"
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        _hover={{
          md: {
            bgColor: "#e0e0e0",
          },
        }}
      >
        <Box
          className="left"
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          gap="2px"
        >
          <Text as="span" fontSize="14px">
            {data.title}
          </Text>
          <Text as="span" fontSize="14px">
            {data.due_date}
          </Text>
        </Box>

        <IconButton
          type="submit"
          variant="outline"
          aria-label="Remove"
          padding={0.5}
          border="none"
          icon={
            <Image
              src="/imgs/remove_icon.svg"
              alt="remove"
              width={30}
              height={30}
            />
          }
          onClick={handleClickDelete}
        />
      </Box>

      <ConfirmDialog
        isOpen={isOpen}
        title="티켓 삭제"
        description={`선택하신 티켓을 삭제하시겠습니까?\n\n선택한 티켓 제목: ${data.title}`}
        confirmButtonText="삭제하기"
        onConfirm={deleteItem}
        onClose={onClose}
      />
    </>
  );
}
