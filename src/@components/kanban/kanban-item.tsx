"use client";

import { kanbanItemSchema } from "@/@schema/kanban.schema";
import { Box, IconButton, Text } from "@chakra-ui/react";
import Image from "next/image";


interface Props {
  data: kanbanItemSchema;
}

export default function KanbanItem({ data }: Props) {
  const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    console.log("remove");
  };

  return (
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
        onClick={handleRemove}
      />
    </Box>
  );
}
