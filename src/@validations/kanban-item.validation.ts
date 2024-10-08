import { z } from "zod";

export const kanbanItemValidationSchema = z.object({
  title: z
    .string()
    .min(1, "제목은 필수입니다")
    .max(15, "제목은 15자 이내여야 합니다"),
  description: z.string().max(200, "설명은 200자 이내여야 합니다").optional(),
  due_date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "날짜 형식은 YYYY-MM-DD여야 합니다"),
  status: z.enum(["todo", "done", "in_progress"], {
    errorMap: () => ({
      message: "상태는 todo, done, in_progress 중 하나여야 합니다",
    }),
  }),
});

export type KanbanItemValidationFormData = z.infer<
  typeof kanbanItemValidationSchema
>;
