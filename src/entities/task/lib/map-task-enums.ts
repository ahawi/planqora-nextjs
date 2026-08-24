import type { TaskPriority, TaskStatus } from '@/src/generated/prisma/enums'

import type { Task } from '../model/types'

const statusFromPrismaMap: Record<TaskStatus, Task['status']> = {
  BACKLOG: 'backlog',
  TODO: 'todo',
  IN_PROGRESS: 'in-progress',
  DONE: 'done',
}

const statusToPrismaMap: Record<Task['status'], TaskStatus> = {
  backlog: 'BACKLOG',
  todo: 'TODO',
  'in-progress': 'IN_PROGRESS',
  done: 'DONE',
}

const priorityFromPrismaMap: Record<TaskPriority, Task['priority']> = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
}

const priorityToPrismaMap: Record<Task['priority'], TaskPriority> = {
  low: 'LOW',
  medium: 'MEDIUM',
  high: 'HIGH',
}

export const mapTaskStatusFromPrisma = (status: TaskStatus): Task['status'] => {
  return statusFromPrismaMap[status]
}

export const mapTaskStatusToPrisma = (status: Task['status']): TaskStatus => {
  return statusToPrismaMap[status]
}

export const mapTaskPriorityFromPrisma = (
  priority: TaskPriority,
): Task['priority'] => {
  return priorityFromPrismaMap[priority]
}

export const mapTaskPriorityToPrisma = (
  priority: Task['priority'],
): TaskPriority => {
  return priorityToPrismaMap[priority]
}
