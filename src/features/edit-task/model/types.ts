import { type Task } from '@/src/entities/task'

export type EditTaskInput = Pick<
  Task,
  'title' | 'deadline' | 'status' | 'priority' | 'tag' | 'assignee' | 'space'
>

export type EditTaskRequest = Omit<EditTaskInput, 'space'>
