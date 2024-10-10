"use client";

import { kanbanItemSchema } from "@/@schema/kanban.schema";
import {
  KanbanItemValidationFormData,
  kanbanItemValidationSchema,
} from "@/@validations/kanban-item.validation";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

interface Props {
  formData: kanbanItemSchema;
}

export default function ItemDetailForm({ formData }: Props) {
  const router = useRouter();
  const { register, handleSubmit, formState } =
    useForm<KanbanItemValidationFormData>({
      defaultValues: formData,
      resolver: zodResolver(kanbanItemValidationSchema),
    });

  const onSubmit: SubmitHandler<KanbanItemValidationFormData> = async (
    data
  ) => {
    const response = await fetch(`/api/board/${formData.id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
    const result =
      (await response.json()) as APIResponseSchema<KanbanItemValidationFormData>;
    if (result.success) {
      alert("저장 되었습니다.");
      handleClose();
    } else {
      alert("저장에 실패했습니다.");
    }
  };

  const handleClose = () => {
    router.refresh();
    // FIXME: /board 페이지 이동 시, 목록 데이터 갱신 이슈있음
    setTimeout(() => router.back(), 200);
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
          <Button onClick={handleClose}>취소하기</Button>
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
