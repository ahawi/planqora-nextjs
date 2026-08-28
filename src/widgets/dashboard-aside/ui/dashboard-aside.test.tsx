import { fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'

import type { Task } from '@/src/entities/task'

import { DashboardAside } from './dashboard-aside'

const setup = () => {
  render(<DashboardAside />)
}

const taskMock: Task = {
  assignee: 'Иван',
  comments: 2,
  coverTone: 'primary',
  deadline: '2026-08-27',
  id: 'task-1',
  priority: 'high',
  progress: 60,
  space: 'Planqora',
  status: 'in-progress',
  tag: 'Разработка',
  title: 'Подключить календарь к задачам',
}

const { tasksQueryStateMock, useGetTasksQueryMock } = vi.hoisted(() => ({
  tasksQueryStateMock: {
    data: undefined as Task[] | undefined,
    error: undefined as unknown,
    isLoading: false,
  },
  useGetTasksQueryMock: vi.fn(),
}))

vi.mock('@/src/entities/task', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/src/entities/task')>()

  return {
    ...actual,
    useGetTasksQuery: useGetTasksQueryMock,
  }
})

beforeEach(() => {
  vi.clearAllMocks()
  vi.useFakeTimers()
  vi.setSystemTime(new Date(2026, 7, 27, 12))

  tasksQueryStateMock.data = undefined
  tasksQueryStateMock.error = undefined
  tasksQueryStateMock.isLoading = false

  useGetTasksQueryMock.mockReturnValue(tasksQueryStateMock)
})

afterEach(() => {
  vi.useRealTimers()
})

describe('DashboardAside', () => {
  test('показывает текущую неделю и выделяет сегодняшний день', () => {
    setup()

    expect(screen.getByText('Август 2026')).toBeInTheDocument()

    expect(
      screen.getByRole('button', {
        name: 'Выбрать 24, Пн',
      }),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('button', {
        name: 'Выбрать 30, Вс',
      }),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('button', {
        name: 'Выбрать 27, Чт',
      }),
    ).toHaveAttribute('aria-pressed', 'true')
  })

  test('выбирает другую дату', () => {
    setup()

    const currentDay = screen.getByRole('button', {
      name: 'Выбрать 27, Чт',
    })

    const nextDay = screen.getByRole('button', {
      name: 'Выбрать 28, Пт',
    })

    fireEvent.click(nextDay)

    expect(currentDay).toHaveAttribute('aria-pressed', 'false')
    expect(nextDay).toHaveAttribute('aria-pressed', 'true')
    expect(useGetTasksQueryMock).toHaveBeenLastCalledWith({
      deadline: '2026-08-28',
    })
  })

  test('переключает недели и обновляет заголовок месяца', () => {
    setup()

    fireEvent.click(
      screen.getByRole('button', {
        name: 'Следующая неделя',
      }),
    )

    expect(screen.getByText('Сентябрь 2026')).toBeInTheDocument()

    expect(
      screen.getByRole('button', {
        name: 'Выбрать 31, Пн',
      }),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('button', {
        name: 'Выбрать 6, Вс',
      }),
    ).toBeInTheDocument()

    fireEvent.click(
      screen.getByRole('button', {
        name: 'Предыдущая неделя',
      }),
    )

    expect(screen.getByText('Август 2026')).toBeInTheDocument()

    expect(
      screen.getByRole('button', {
        name: 'Выбрать 27, Чт',
      }),
    ).toBeInTheDocument()
  })

  test('показывает задачу на выбранную дату', () => {
    tasksQueryStateMock.data = [taskMock]

    setup()

    expect(
      screen.getByRole('heading', {
        name: 'Задача на выбранную дату',
      }),
    ).toBeInTheDocument()

    expect(screen.getByText('Planqora')).toBeInTheDocument()
    expect(
      screen.getByText('Подключить календарь к задачам'),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('progressbar', {
        name: 'Выполнено 60%',
      }),
    ).toHaveAttribute('aria-valuenow', '60')

    expect(
      screen.getByRole('link', {
        name: 'Открыть задачу',
      }),
    ).toHaveAttribute('href', '/tasks/task-1')
  })

  test('показывает состояние загрузки задач', () => {
    tasksQueryStateMock.data = undefined
    tasksQueryStateMock.isLoading = true

    setup()

    expect(
      screen.getByRole('status', {
        name: 'Загрузка задач на выбранную дату',
      }),
    ).toBeInTheDocument()

    expect(
      screen.queryByRole('heading', {
        name: 'Задача на выбранную дату',
      }),
    ).not.toBeInTheDocument()
  })

  test('показывает ошибку загрузки задач', () => {
    tasksQueryStateMock.data = undefined
    tasksQueryStateMock.error = { status: 500 }

    setup()

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Не удалось загрузить задачи на выбранную дату',
    )

    expect(
      screen.queryByRole('heading', {
        name: 'Задача на выбранную дату',
      }),
    ).not.toBeInTheDocument()
  })

  test('показывает пустое состояние, если задач на дату нет', () => {
    tasksQueryStateMock.data = []

    setup()

    expect(screen.getByRole('status')).toHaveTextContent(
      'На выбранную дату задач нет',
    )
    expect(screen.getByRole('status')).toHaveTextContent(
      'Выберите другой день в календаре',
    )

    expect(
      screen.queryByRole('link', {
        name: 'Открыть задачу',
      }),
    ).not.toBeInTheDocument()
  })
})
