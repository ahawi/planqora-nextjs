import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, test, vi } from 'vitest'

import { type Task, tasksMock } from '@/src/entities/task'

import { UpcomingTasks } from './upcoming-tasks'

const { tasksQueryStateMock } = vi.hoisted(() => ({
  tasksQueryStateMock: {
    data: undefined as Task[] | undefined,
    isLoading: false,
    error: undefined as unknown,
  },
}))

vi.mock('@/src/entities/task', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/src/entities/task')>()

  return {
    ...actual,
    useGetTasksQuery: () => tasksQueryStateMock,
  }
})

const setup = () => {
  render(<UpcomingTasks />)
}

beforeEach(() => {
  vi.clearAllMocks()

  tasksQueryStateMock.data = tasksMock.map((task) => ({ ...task }))
  tasksQueryStateMock.isLoading = false
  tasksQueryStateMock.error = undefined
})

describe('UpcomingTasks', () => {
  test('показывает две ближайшие незавершенные задачи', () => {
    setup()

    const taskTitles = screen
      .getAllByRole('link')
      .map((link) => link.textContent)

    expect(taskTitles).toEqual([
      'Исследовать конкурентов',
      'Продумать сценарии приложения',
    ])
  })

  test('не показывает завершенные задачи', () => {
    setup()

    expect(
      screen.queryByRole('link', {
        name: 'Анализ текущего сайта',
      }),
    ).not.toBeInTheDocument()

    expect(
      screen.queryByRole('link', {
        name: 'Утвердить концепцию дизайна',
      }),
    ).not.toBeInTheDocument()
  })

  test('показывает состояние загрузки', () => {
    tasksQueryStateMock.data = undefined
    tasksQueryStateMock.isLoading = true

    setup()

    expect(screen.getByRole('status')).toHaveTextContent(
      'Загрузка ближайших задач...',
    )

    expect(
      screen.queryByRole('heading', {
        name: 'Ближайшие задачи',
      }),
    ).not.toBeInTheDocument()
  })

  test('показывает ошибку загрузки', () => {
    tasksQueryStateMock.data = undefined
    tasksQueryStateMock.error = { status: 500 }

    setup()

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Не удалось загрузить ближайшие задачи',
    )

    expect(
      screen.queryByRole('heading', {
        name: 'Ближайшие задачи',
      }),
    ).not.toBeInTheDocument()
  })

  test('не показывает секцию при пустом списке задач', () => {
    tasksQueryStateMock.data = []

    setup()

    expect(
      screen.queryByRole('heading', {
        name: 'Ближайшие задачи',
      }),
    ).not.toBeInTheDocument()
  })
})
