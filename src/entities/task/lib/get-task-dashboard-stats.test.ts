import { describe, expect, test } from 'vitest'

import { TaskStatus } from '@/src/generated/prisma/enums'

import { getTaskDashboardStats } from './get-task-dashboard-stats'

const today = new Date('2026-08-26T12:00:00.000Z')

describe('getTaskDashboardStats', () => {
  test('возвращает пустую статистику за последние семь дней', () => {
    const result = getTaskDashboardStats([], today)

    expect(result.totalTasks).toBe(0)
    expect(result.activeTasks).toBe(0)
    expect(result.activePercent).toBe(0)

    expect(result.activity).toEqual([
      {
        date: '2026-08-20',
        label: 'Чт',
        created: 0,
        completed: 0,
      },
      {
        date: '2026-08-21',
        label: 'Пт',
        created: 0,
        completed: 0,
      },
      {
        date: '2026-08-22',
        label: 'Сб',
        created: 0,
        completed: 0,
      },
      {
        date: '2026-08-23',
        label: 'Вс',
        created: 0,
        completed: 0,
      },
      {
        date: '2026-08-24',
        label: 'Пн',
        created: 0,
        completed: 0,
      },
      {
        date: '2026-08-25',
        label: 'Вт',
        created: 0,
        completed: 0,
      },
      {
        date: '2026-08-26',
        label: 'Ср',
        created: 0,
        completed: 0,
      },
    ])
  })

  test('считает общее количество и процент активных задач', () => {
    const result = getTaskDashboardStats(
      [
        {
          status: TaskStatus.BACKLOG,
          createdAt: new Date('2026-08-24T10:00:00.000Z'),
          completedAt: null,
        },
        {
          status: TaskStatus.IN_PROGRESS,
          createdAt: new Date('2026-08-25T10:00:00.000Z'),
          completedAt: null,
        },
        {
          status: TaskStatus.DONE,
          createdAt: new Date('2026-08-20T10:00:00.000Z'),
          completedAt: new Date('2026-08-26T10:00:00.000Z'),
        },
      ],
      today,
    )

    expect(result.totalTasks).toBe(3)
    expect(result.activeTasks).toBe(2)
    expect(result.activePercent).toBe(67)
  })

  test('распределяет созданные и завершенные задачи по дням', () => {
    const result = getTaskDashboardStats(
      [
        {
          status: TaskStatus.TODO,
          createdAt: new Date('2026-08-25T18:00:00.000Z'),
          completedAt: null,
        },
        {
          status: TaskStatus.DONE,
          createdAt: new Date('2026-08-01T10:00:00.000Z'),
          completedAt: new Date('2026-08-26T09:00:00.000Z'),
        },
        {
          status: TaskStatus.DONE,
          createdAt: new Date('2026-08-19T10:00:00.000Z'),
          completedAt: new Date('2026-08-19T18:00:00.000Z'),
        },
      ],
      today,
    )

    expect(result.activity).toEqual([
      {
        date: '2026-08-20',
        label: 'Чт',
        created: 0,
        completed: 0,
      },
      {
        date: '2026-08-21',
        label: 'Пт',
        created: 0,
        completed: 0,
      },
      {
        date: '2026-08-22',
        label: 'Сб',
        created: 0,
        completed: 0,
      },
      {
        date: '2026-08-23',
        label: 'Вс',
        created: 0,
        completed: 0,
      },
      {
        date: '2026-08-24',
        label: 'Пн',
        created: 0,
        completed: 0,
      },
      {
        date: '2026-08-25',
        label: 'Вт',
        created: 1,
        completed: 0,
      },
      {
        date: '2026-08-26',
        label: 'Ср',
        created: 0,
        completed: 1,
      },
    ])
  })
})
