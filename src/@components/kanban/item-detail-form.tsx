"use client";

import { kanbanItemSchema } from "@/@schema/kanban.schema";
import { APIResponseBody } from "@/@types/api.type";
import {
  KanbanItemValidationFormData,
  kanbanItemValidationSchema,
} from "@/@validations/kanban-item.validation";
import { useModalProvider } from "@/@providers/modal-provider";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { PropsWithChildren } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface Props {
  formData: kanbanItemSchema;
}

export default function ItemDetailForm({ formData }: PropsWithChildren<Props>) {
  const { register, handleSubmit, formState } =
    useForm<KanbanItemValidationFormData>({
      defaultValues: formData,
      resolver: zodResolver(kanbanItemValidationSchema),
    });
  const { onCloseModal } = useModalProvider();

  const onSubmit: SubmitHandler<KanbanItemValidationFormData> = async (
    data
  ) => {
    const response = await fetch(`/api/ticket/${formData.id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
    const result =
      (await response.json()) as APIResponseBody<KanbanItemValidationFormData>;
    if (result.success) {
      console.log("저장 되었습니다.");
      onCloseModal({ isRefresh: true });
    } else {
      alert("저장에 실패했습니다.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={4} align="stretch">
        <FormControl isRequired isInvalid={!!formState.errors.title}>
          <FormLabel>제목</FormLabel>
          <Input {...register("title")} defaultValue={formData.title} />
          {formState.errors.title && (
            <FormErrorMessage>
              {formState.errors.title.message}
            </FormErrorMessage>
          )}
        </FormControl>

        <FormControl isInvalid={!!formState.errors.description}>
          <FormLabel>설명</FormLabel>
          <Textarea
            {...register("description")}
            defaultValue={formData.description}
          />
          {formState.errors.description && (
            <FormErrorMessage>
              {formState.errors.description.message}
            </FormErrorMessage>
          )}
        </FormControl>

        <FormControl isRequired isInvalid={!!formState.errors.due_date}>
          <FormLabel>마감일</FormLabel>
          <Input
            type="date"
            {...register("due_date")}
            defaultValue={formData.due_date}
          />
          {formState.errors.due_date && (
            <FormErrorMessage>
              {formState.errors.due_date.message}
            </FormErrorMessage>
          )}
        </FormControl>

        <FormControl isRequired isInvalid={!!formState.errors.status}>
          <FormLabel>상태</FormLabel>
          <Select {...register("status")} defaultValue={formData.status}>
            <option value="todo">할 일</option>
            <option value="in_progress">진행 중</option>
            <option value="done">완료</option>
          </Select>
          {formState.errors.status && (
            <FormErrorMessage>
              {formState.errors.status.message}
            </FormErrorMessage>
          )}
        </FormControl>

        <ButtonGroup spacing="2" justifyContent="center">
          <Button onClick={() => onCloseModal()}>취소하기</Button>
          <Button
            type="submit"
            colorScheme="red"
            isLoading={formState.isSubmitting}
          >
            저장하기
          </Button>
        </ButtonGroup>
      </VStack>
    </form>
  );
}
