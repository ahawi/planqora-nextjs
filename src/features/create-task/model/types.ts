import type { Task } from '@/src/entities/task'

export type CreateTaskInput = Pick<
  Task,
  'title' | 'deadline' | 'status' | 'priority' | 'tag' | 'assignee' | 'space'
>

