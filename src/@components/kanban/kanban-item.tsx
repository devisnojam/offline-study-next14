"use client";

import { TTicketSchema } from "@/@schema/kanban.schema";
import { Box, IconButton, Text, useDisclosure } from "@chakra-ui/react";
import Image from "next/image";
import ConfirmDialog from "../confirm-dialog";
import { useRouter } from "next/navigation";
import { APIResponseBody } from "@/@types/type";

interface Props {
  ticketData: TTicketSchema;
}

export default function KanbanItem({ ticketData }: Props) {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleClickDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onOpen();
  };

  const deleteItem = async () => {
    const result = await fetch(`/api/ticket/${ticketData.id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((result) => result as APIResponseBody<null>);

    if (result.success) {
      alert(result.message);
      router.refresh();
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
            {ticketData.title}
          </Text>
          <Text as="span" fontSize="14px">
            {ticketData.due_date}
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
        description={`선택하신 티켓을 삭제하시겠습니까?\n\n선택한 티켓 제목: ${ticketData.title}`}
        confirmButtonText="삭제하기"
        onConfirm={deleteItem}
        onClose={onClose}
      />
    </>
  );
}
