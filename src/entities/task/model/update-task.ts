import { type Task } from './types'

export const updateTask = (
  tasks: Task[],
  taskId: string,
  updates: Partial<Omit<Task, 'id'>>,
): Task[] => {
  const updatedTask = tasks.map((task) => {
    if (task.id !== taskId) return task

    return {
      ...task,
      ...updates,
    }
  })

  return updatedTask
}
