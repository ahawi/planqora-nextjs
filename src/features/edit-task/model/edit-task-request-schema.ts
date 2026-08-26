import { z } from 'zod'

import { editTaskSchema } from './edit-task-schema'
import type { EditTaskRequest } from './types'

export const editTaskRequestSchema = editTaskSchema.omit({
  space: true,
}) satisfies z.ZodType<EditTaskRequest>
