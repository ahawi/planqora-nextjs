import { z } from 'zod'

import type { CreateTaskRequest } from './types'

export const createTaskRequestSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'Введите название задачи')
    .max(100, 'Название не должно превышать 100 символов'),
  deadline: z
    .string()
    .trim()
    .min(1, 'Выберите срок выполнения')
    .pipe(z.iso.date({ error: 'Введите корректную дату' })),
  status: z.enum(['backlog', 'todo', 'in-progress', 'done']),
  priority: z.enum(['low', 'medium', 'high']),
  tag: z.string().trim().max(50, 'Категория не должна превышать 50 символов'),
  assignee: z
    .string()
    .trim()
    .max(100, 'Имя исполнителя не должно превышать 100 символов'),
  spaceId: z.string().trim().min(1, 'Не указано пространство'),
}) satisfies z.ZodType<CreateTaskRequest>
