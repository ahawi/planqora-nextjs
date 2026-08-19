import { z } from 'zod'

import type { CreateTaskInput } from './types'

export const createTaskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'Введите название задачи')
    .max(100, 'Название не должно превышать 100 символов'),
  deadline: z.string().trim().min(1, 'Выберите срок выполнения'),
  status: z.enum(['backlog', 'todo', 'in-progress', 'done']),
  priority: z.enum(['low', 'medium', 'high']),
  tag: z.string().trim(),
  assignee: z.string().trim(),
  space: z.string().trim(),
}) satisfies z.ZodType<CreateTaskInput>
