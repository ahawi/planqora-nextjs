import type { Task } from '@/src/entities/task'

import type { CreateTaskInput } from './types'

export const createTask = (form: CreateTaskInput, id: string): Task => {
  return {
    ...form,
    id,
    comments: 0,
    progress: 0,
    coverTone: 'primary',
  }
}
