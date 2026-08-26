import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, test, vi } from 'vitest'

import { type Task, tasksMock } from '@/src/entities/task'

import { TaskExplorer } from './task-explorer'

const { tasksQueryStateMock } = vi.hoisted(() => ({
  tasksQueryStateMock: {
    data: undefined as Task[] | undefined,
    isLoading: false,
    error: undefined as unknown,
  },
}))

vi.mock('@/src/entities/task', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/src/entities/task')>()

  return { ...actual, useGetTasksQuery: () => tasksQueryStateMock }
})

const setup = () => {
  const user = userEvent.setup()

  render(
    <TaskExplorer
      header={<header>Мои задачи</header>}
      loading={<div role="status">Загрузка задач...</div>}
    />,
  )

  return { user }
}

beforeEach(() => {
  vi.clearAllMocks()
  tasksQueryStateMock.data = tasksMock.map((task) => ({ ...task }))
  tasksQueryStateMock.isLoading = false
  tasksQueryStateMock.error = undefined
})

describe('TaskExplorer', () => {
  test('фильтрует карточки при вводе поискового запроса', async () => {
    const { user } = setup()

    const searchInput = screen.getByRole('searchbox', {
      name: 'Поиск задачи',
    })

    await user.type(searchInput, 'UI-kit')

    expect(
      screen.getByRole('link', {
        name: 'Собрать UI-kit проекта',
      }),
    ).toBeInTheDocument()

    await waitFor(() => {
      expect(
        screen.queryByRole('link', {
          name: 'Настроить авторизацию',
        }),
      ).not.toBeInTheDocument()
    })
  })

  test('можно выбрать несколько категорий', async () => {
    const { user } = setup()

    const categorySelect = screen.getByRole('combobox', {
      name: 'Категория задачи',
    })

    await user.selectOptions(categorySelect, 'UX')
    await user.selectOptions(categorySelect, 'Вёрстка')

    const chips = screen.getByLabelText('Выбранные категории')

    expect(within(chips).getByText('UX')).toBeInTheDocument()
    expect(within(chips).getByText('Вёрстка')).toBeInTheDocument()

    expect(
      screen.getByRole('link', {
        name: 'Продумать сценарии приложения',
      }),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('link', {
        name: 'Сверстать адаптив главной',
      }),
    ).toBeInTheDocument()
  })

  test('повторный выбор не создаёт второй чип', async () => {
    const { user } = setup()

    const categorySelect = screen.getByRole('combobox', {
      name: 'Категория задачи',
    })

    await user.selectOptions(categorySelect, 'UX')
    await user.selectOptions(categorySelect, 'UX')

    const chips = screen.getByLabelText('Выбранные категории')

    expect(within(chips).getAllByText('UX')).toHaveLength(1)
  })

  test('удаление чипа возвращает задачи этой категории', async () => {
    const { user } = setup()

    const categorySelect = screen.getByRole('combobox', {
      name: 'Категория задачи',
    })

    await user.selectOptions(categorySelect, 'UX')

    expect(
      screen.queryByRole('link', {
        name: 'Собрать UI-kit проекта',
      }),
    ).not.toBeInTheDocument()

    await user.click(
      screen.getByRole('button', {
        name: 'Удалить категорию UX',
      }),
    )

    expect(
      screen.queryByRole('button', {
        name: 'Удалить категорию UX',
      }),
    ).not.toBeInTheDocument()

    expect(
      screen.getByRole('link', {
        name: 'Собрать UI-kit проекта',
      }),
    ).toBeInTheDocument()
  })

  test('неизвестный запрос показывает пустое состояние', async () => {
    const { user } = setup()

    await user.type(
      screen.getByRole('searchbox', {
        name: 'Поиск задачи',
      }),
      'несуществующая задача',
    )

    const emptyState = await screen.findByRole('status')

    expect(
      within(emptyState).getByRole('heading', {
        name: 'Задачи не найдены',
      }),
    ).toBeInTheDocument()
  })

  test('после выбора сортировки показывает задачи с ближайшим дедлайном первыми', async () => {
    const { user } = setup()

    const sortSelect = screen.getByRole('combobox', {
      name: 'Сортировка задач',
    })

    await user.selectOptions(sortSelect, 'deadline-asc')

    const urgentHeading = screen.getByRole('heading', {
      name: 'Срочные задачи',
    })

    const urgentSection = urgentHeading.closest('section')

    if (!urgentSection) {
      throw new Error('Секция срочных задач не найдена')
    }

    const taskLinks = within(urgentSection).getAllByRole('link')

    const taskTitles = taskLinks.map((link) => link.textContent)

    expect(taskTitles).toEqual([
      'Исследовать конкурентов',
      'Собрать UI-kit проекта',
      'Настроить авторизацию',
    ])
  })

  test('показывает состояние загрузки', () => {
    tasksQueryStateMock.data = undefined
    tasksQueryStateMock.isLoading = true

    setup()

    expect(screen.getByRole('status')).toHaveTextContent('Загрузка задач...')

    expect(
      screen.queryByRole('link', {
        name: 'Собрать UI-kit проекта',
      }),
    ).not.toBeInTheDocument()
  })

  test('показывает ошибку загрузки задач', () => {
    tasksQueryStateMock.data = undefined
    tasksQueryStateMock.error = { status: 500 }

    setup()

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Не удалось загрузить задачи',
    )

    expect(
      screen.queryByRole('link', {
        name: 'Собрать UI-kit проекта',
      }),
    ).not.toBeInTheDocument()
  })
})
