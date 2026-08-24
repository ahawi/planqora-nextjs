import type { TaskPriority, TaskStatus } from '@/src/generated/prisma/enums'

import { type Task } from '../model/types'
import {
  mapTaskPriorityFromPrisma,
  mapTaskStatusFromPrisma,
} from './map-task-enums'

interface TaskDTO {
  assignee: string
  commentsCount: number
  id: string
  priority: TaskPriority
  progress: number
  space: {
    id: string
    title: string
  }
  status: TaskStatus
  tag: string
  title: string
  deadline: Date
}

export const mapTaskDTO = (task: TaskDTO): Task => {
  const priority = mapTaskPriorityFromPrisma(task.priority)

  return {
    assignee: task.assignee,
    comments: task.commentsCount,
    coverTone: priority === 'high' ? 'warning' : 'primary',
    id: task.id,
    priority,
    progress: task.progress,
    space: task.space.title,
    status: mapTaskStatusFromPrisma(task.status),
    tag: task.tag,
    title: task.title,
    deadline: task.deadline.toISOString().slice(0, 10),
  }
}
