"use client";

import { kanbanItemSchema } from "@/@schema/kanban.schema";
import { kanbanItemValidationSchema } from "@/@validations/kanban-item.validation";
import { APIResponseSchema } from "@/app/api/board/[id]/route";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  VStack,
  ButtonGroup,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useZorm } from "react-zorm";

interface Props {
  formData: kanbanItemSchema;
}

export default function ItemDetailForm({ formData }: Props) {
  const zo = useZorm("kanban-item-detail-form", kanbanItemValidationSchema, {
    async onValidSubmit(e) {
      e.preventDefault();
      const response = await fetch(`/api/board/${formData.id}`, {
        method: "PUT",
        body: new FormData(e.target),
      });
      const result =
        (await response.json()) as APIResponseSchema<kanbanItemSchema>;
      // TODO: 에러핸들링 및 로딩처리
      if (result.success) {
        alert("수정되었습니다.");
        handleClose();
      }
    },
  });

  const router = useRouter();
  const handleClose = () => router.back();

  console.log("zo.validation: ", zo.validation);
  const disabled = zo.validation?.success === false;

  return (
    <form ref={zo.ref}>
      <VStack spacing={4} align="stretch">
        <FormControl isRequired isInvalid={zo.errors.title(true)}>
          <FormLabel>제목</FormLabel>
          <Input name={zo.fields.title()} defaultValue={formData.title} />
          {zo.errors.title((e) => (
            <FormErrorMessage>{e.message}</FormErrorMessage>
          ))}
        </FormControl>

        <FormControl isInvalid={zo.errors.description(true)}>
          <FormLabel>설명</FormLabel>
          <Textarea
            name={zo.fields.description()}
            defaultValue={formData.description}
          />
          {zo.errors.description((e) => (
            <FormErrorMessage>{e.message}</FormErrorMessage>
          ))}
        </FormControl>

        <FormControl isRequired isInvalid={zo.errors.due_date(true)}>
          <FormLabel>마감일</FormLabel>
          <Input
            type="date"
            name={zo.fields.due_date()}
            defaultValue={formData.due_date}
          />
          {zo.errors.due_date((e) => (
            <FormErrorMessage>{e.message}</FormErrorMessage>
          ))}
        </FormControl>

        <FormControl isRequired isInvalid={zo.errors.status(true)}>
          <FormLabel>상태</FormLabel>
          <Select name={zo.fields.status()} defaultValue={formData.status}>
            <option value="todo">할 일</option>
            <option value="in_progress">진행 중</option>
            <option value="done">완료</option>
          </Select>
          {zo.errors.status((e) => (
            <FormErrorMessage>{e.message}</FormErrorMessage>
          ))}
        </FormControl>

        <ButtonGroup spacing="2" justifyContent="center">
          <Button onClick={handleClose}>취소하기</Button>
          <Button
            type="submit"
            colorScheme="red"
            isDisabled={disabled}
            // isLoading={pending}
            // aria-disabled={pending}
          >
            저장하기
          </Button>
        </ButtonGroup>
      </VStack>
    </form>
  );
}
