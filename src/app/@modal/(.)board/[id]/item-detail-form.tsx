"use client";

import { kanbanItemSchema } from "@/@schema/kanban.schema";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  VStack,
  Text,
  ButtonGroup,
} from "@chakra-ui/react";
import { useFormState, useFormStatus } from "react-dom";
import { updateFormData } from "../../../actions";
import { useRouter } from "next/navigation";

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      colorScheme="blue"
      isLoading={pending}
      aria-disabled={pending}
    >
      저장
    </Button>
  );
};

interface Props {
  formData: kanbanItemSchema;
}

export default function ItemDetailForm({ formData }: Props) {
  const [formResult, formAction] = useFormState(updateFormData, {
    message: "",
  });

  const router = useRouter();
  const handleClose = () => router.back();

  return (
    <form action={formAction}>
      <VStack spacing={4} align="stretch">
        <input type="hidden" name="id" value={formData.id} />
        <FormControl isRequired>
          <FormLabel>제목</FormLabel>
          <Input name="title" defaultValue={formData.title} />
        </FormControl>

        <FormControl>
          <FormLabel>설명</FormLabel>
          <Textarea name="description" defaultValue={formData.description} />
        </FormControl>

        <FormControl>
          <FormLabel>마감일</FormLabel>
          <Input type="date" name="due_date" defaultValue={formData.due_date} />
        </FormControl>

        <FormControl>
          <FormLabel>상태</FormLabel>
          <Select name="status" defaultValue={formData.status}>
            <option value="todo">할 일</option>
            <option value="in_progress">진행 중</option>
            <option value="done">완료</option>
          </Select>
        </FormControl>

        <ButtonGroup spacing="2" justifyContent="center">
          <Button colorScheme="red" onClick={handleClose}>
            취소
          </Button>
          <SubmitButton />
        </ButtonGroup>

        {formResult.message && <Text>{formResult.message}</Text>}
      </VStack>
    </form>
  );
}
