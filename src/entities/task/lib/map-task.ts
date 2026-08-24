import type { TaskPriority, TaskStatus } from '@/src/generated/prisma/enums'

import { type Task } from '../model/types'

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

const statusMap: Record<TaskStatus, Task['status']> = {
  BACKLOG: 'backlog',
  TODO: 'todo',
  IN_PROGRESS: 'in-progress',
  DONE: 'done',
}

const priorityMap: Record<TaskPriority, Task['priority']> = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
}

export const mapTaskDTO = (task: TaskDTO): Task => {
  return {
    assignee: task.assignee,
    comments: task.commentsCount,
    coverTone: task.priority === 'HIGH' ? 'warning' : 'primary',
    id: task.id,
    priority: priorityMap[task.priority],
    progress: task.progress,
    space: task.space.title,
    status: statusMap[task.status],
    tag: task.tag,
    title: task.title,
    deadline: task.deadline.toISOString().slice(0, 10),
  }
}
