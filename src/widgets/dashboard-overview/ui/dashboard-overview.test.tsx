import { render, screen, within } from '@testing-library/react'
import { beforeEach, describe, expect, test, vi } from 'vitest'

import type { TaskDashboardStats } from '@/src/entities/task'

import { DashboardOverview } from './dashboard-overview'

const { dashboardQueryStateMock } = vi.hoisted(() => ({
  dashboardQueryStateMock: {
    data: undefined as TaskDashboardStats | undefined,
    isLoading: false,
    error: undefined as unknown,
  },
}))

vi.mock('@/src/entities/task', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/src/entities/task')>()

  return {
    ...actual,
    useGetTaskDashboardStatsQuery: () => dashboardQueryStateMock,
  }
})

const dashboardStatsMock: TaskDashboardStats = {
  totalTasks: 13,
  activeTasks: 7,
  activePercent: 54,
  activity: [
    {
      date: '2026-08-21',
      label: 'Пт',
      created: 1,
      completed: 0,
    },
    {
      date: '2026-08-22',
      label: 'Сб',
      created: 2,
      completed: 1,
    },
    {
      date: '2026-08-23',
      label: 'Вс',
      created: 1,
      completed: 0,
    },
    {
      date: '2026-08-24',
      label: 'Пн',
      created: 3,
      completed: 1,
    },
    {
      date: '2026-08-25',
      label: 'Вт',
      created: 1,
      completed: 1,
    },
    {
      date: '2026-08-26',
      label: 'Ср',
      created: 2,
      completed: 1,
    },
    {
      date: '2026-08-27',
      label: 'Чт',
      created: 1,
      completed: 1,
    },
  ],
}

const setup = () => {
  render(<DashboardOverview />)
}

beforeEach(() => {
  vi.clearAllMocks()

  dashboardQueryStateMock.data = {
    ...dashboardStatsMock,
    activity: dashboardStatsMock.activity.map((day) => ({
      ...day,
    })),
  }
  dashboardQueryStateMock.isLoading = false
  dashboardQueryStateMock.error = undefined
})

describe('DashboardOverview', () => {
  test('показывает статистику задач', () => {
    setup()

    const runningTasksCard = screen
      .getByRole('heading', {
        name: 'Активные задачи',
      })
      .closest('article')

    expect(runningTasksCard).not.toBeNull()

    expect(within(runningTasksCard!).getByText('7')).toBeInTheDocument()
    expect(within(runningTasksCard!).getByText('54%')).toBeInTheDocument()
    expect(within(runningTasksCard!).getByText('13')).toBeInTheDocument()

    expect(
      screen.getByRole('heading', {
        name: 'Активность',
      }),
    ).toBeInTheDocument()
  })

  test('показывает состояние загрузки', () => {
    dashboardQueryStateMock.data = undefined
    dashboardQueryStateMock.isLoading = true

    setup()

    expect(screen.getByRole('status')).toHaveTextContent(
      'Загрузка статистики...',
    )

    expect(
      screen.queryByRole('heading', {
        name: 'Активные задачи',
      }),
    ).not.toBeInTheDocument()
  })

  test('показывает ошибку загрузки', () => {
    dashboardQueryStateMock.data = undefined
    dashboardQueryStateMock.error = {
      status: 500,
    }

    setup()

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Не удалось загрузить статистику',
    )

    expect(
      screen.queryByRole('heading', {
        name: 'Активные задачи',
      }),
    ).not.toBeInTheDocument()
  })
})
