import { type Task } from '@/src/entities/task'

export type TaskSort = 'default' | 'deadline-asc' | 'deadline-desc'

export const sortTasks = (tasks: Task[], sortOrder: TaskSort): Task[] => {
  const sortedTasks = [...tasks]

  if (sortOrder === 'default') {
    return sortedTasks
  }

  if (sortOrder === 'deadline-asc') {
    return sortedTasks.sort((a, b) => a.deadline.localeCompare(b.deadline))
  }

  return sortedTasks.sort((a, b) => b.deadline.localeCompare(a.deadline))
}
