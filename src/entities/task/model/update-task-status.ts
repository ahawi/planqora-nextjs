import { type Task } from './types'

export const updateTaskStatus = (
  tasks: Task[],
  taskId: string,
  newStatus: Task['status'],
): Task[] => {
  return tasks.map((task) => {
    if (task.id === taskId) {
      return { ...task, status: newStatus }
    }
    return task
  })
}
