import { z } from 'zod'

export const getTasksQuerySchema = z.object({
  spaceId: z.string().trim().min(1).optional(),
  deadline: z.iso.date().optional(),
})

export type GetTasksQuery = z.infer<typeof getTasksQuerySchema>
