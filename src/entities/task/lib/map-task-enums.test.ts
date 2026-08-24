import { describe, expect, test } from 'vitest'

import { TaskPriority, TaskStatus } from '@/src/generated/prisma/enums'

import {
  mapTaskPriorityToPrisma,
  mapTaskStatusToPrisma,
} from './map-task-enums'

describe('mapTaskStatusToPrisma', () => {
  test.each([
    ['backlog', TaskStatus.BACKLOG],
    ['todo', TaskStatus.TODO],
    ['in-progress', TaskStatus.IN_PROGRESS],
    ['done', TaskStatus.DONE],
  ] as const)('преобразует статус %s в %s', (status, expected) => {
    expect(mapTaskStatusToPrisma(status)).toBe(expected)
  })
})

describe('mapTaskPriorityToPrisma', () => {
  test.each([
    ['low', TaskPriority.LOW],
    ['medium', TaskPriority.MEDIUM],
    ['high', TaskPriority.HIGH],
  ] as const)('преобразует приоритет %s в %s', (priority, expected) => {
    expect(mapTaskPriorityToPrisma(priority)).toBe(expected)
  })
})
