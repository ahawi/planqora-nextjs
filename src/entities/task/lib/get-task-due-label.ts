import { formatTimeLeft } from '@/src/shared/lib'

import type { Task } from '../model/types'

type TaskDue = Pick<Task, 'deadline' | 'status'>

export const getTaskDueLabel = (
  task: TaskDue,
  currentDate = new Date(),
): string => {
  if (task.status === 'done') {
    return 'Выполнено'
  }

  return formatTimeLeft(task.deadline, currentDate)
}
