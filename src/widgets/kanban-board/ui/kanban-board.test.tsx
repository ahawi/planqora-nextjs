import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, test, vi } from 'vitest'

import { StoreProvider } from '@/src/app/providers'
import { type Task, tasksMock } from '@/src/entities/task'
import type { CreateTaskRequest } from '@/src/features/create-task'
import type { EditTaskRequest } from '@/src/features/edit-task'

import { KanbanBoard } from './kanban-board'

const {
  createTaskMock,
  mutationStateMock,
  editTaskMock,
  deleteTaskMock,
  tasksQueryStateMock,
  editMutationStateMock,
  deleteMutationStateMock,
} = vi.hoisted(() => ({
  createTaskMock: vi.fn(),
  mutationStateMock: {
    error: undefined as unknown,
    reset: vi.fn(),
  },
  editTaskMock: vi.fn(),
  deleteTaskMock: vi.fn(),
  tasksQueryStateMock: {
    data: undefined as Task[] | undefined,
    isLoading: false,
    error: undefined as unknown,
  },
  editMutationStateMock: {
    error: undefined as unknown,
    reset: vi.fn(),
  },
  deleteMutationStateMock: {
    error: undefined as unknown,
    isLoading: false,
    reset: vi.fn(),
  },
}))

vi.mock('@/src/entities/task', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/src/entities/task')>()

  return { ...actual, useGetTasksQuery: () => tasksQueryStateMock }
})

vi.mock('@/src/features/create-task', async (importOriginal) => {
  const actual =
    await importOriginal<typeof import('@/src/features/create-task')>()

  return {
    ...actual,
    useCreateTaskMutation: () => [createTaskMock, mutationStateMock],
  }
})

vi.mock('@/src/features/edit-task', async (importOriginal) => {
  const actual =
    await importOriginal<typeof import('@/src/features/edit-task')>()

  return {
    ...actual,
    useEditTaskMutation: () => [editTaskMock, editMutationStateMock],
  }
})

vi.mock('@/src/features/delete-task', async (importOriginal) => {
  const actual =
    await importOriginal<typeof import('@/src/features/delete-task')>()

  return {
    ...actual,
    useDeleteTaskMutation: () => [deleteTaskMock, deleteMutationStateMock],
  }
})

beforeEach(() => {
  vi.clearAllMocks()
  tasksQueryStateMock.data = tasksMock.map((task) => ({ ...task }))
  tasksQueryStateMock.isLoading = false
  tasksQueryStateMock.error = undefined
  mutationStateMock.error = undefined
  editMutationStateMock.error = undefined
  deleteMutationStateMock.error = undefined
  deleteMutationStateMock.isLoading = false

  createTaskMock.mockImplementation((input: CreateTaskRequest) => {
    const task: Task = {
      id: 'created-task',
      title: input.title,
      deadline: input.deadline,
      status: input.status,
      priority: input.priority,
      tag: input.tag,
      assignee: input.assignee,
      space: 'Обучение',
      comments: 0,
      progress: 0,
      coverTone: input.priority === 'high' ? 'warning' : 'primary',
    }

    return {
      unwrap: vi.fn().mockResolvedValue(task),
    }
  })

  editTaskMock.mockImplementation(
    ({ taskId, body }: { taskId: Task['id']; body: EditTaskRequest }) => {
      const task: Task = {
        id: taskId,
        ...body,
        space: 'Редизайн сайта',
        comments: 2,
        progress: 30,
        coverTone: body.priority === 'high' ? 'warning' : 'primary',
      }

      return {
        unwrap: vi.fn().mockResolvedValue(task),
      }
    },
  )

  deleteTaskMock.mockReturnValue({
    unwrap: vi.fn().mockResolvedValue(undefined),
  })
})

const setup = () => {
  const user = userEvent.setup()

  const { rerender } = render(
    <StoreProvider>
      <KanbanBoard spaceId="space-1" />
    </StoreProvider>,
  )

  return { user, rerender }
}

describe('KanbanBoard', () => {
  test('отправляет новый статус задачи', async () => {
    const { user } = setup()

    const backlogHeading = screen.getByRole('heading', {
      name: 'Бэклог',
    })

    const todoHeading = screen.getByRole('heading', {
      name: 'К выполнению',
    })

    const backlogColumn = backlogHeading.closest('section')
    const todoColumn = todoHeading.closest('section')

    if (!backlogColumn || !todoColumn) {
      throw new Error('Колонки канбан-доски не найдены')
    }

    expect(
      within(backlogColumn).getByRole('link', {
        name: 'Исследовать конкурентов',
      }),
    ).toBeInTheDocument()

    expect(
      within(todoColumn).queryByRole('link', {
        name: 'Исследовать конкурентов',
      }),
    ).not.toBeInTheDocument()

    await user.click(
      screen.getByRole('button', {
        name: 'Переместить задачу Исследовать конкурентов дальше',
      }),
    )

    expect(editTaskMock).toHaveBeenCalledWith({
      taskId: 'research',
      body: {
        title: 'Исследовать конкурентов',
        deadline: '2026-08-15',
        status: 'todo',
        priority: 'high',
        tag: 'Исследование',
        assignee: 'АМ',
      },
    })
  })

  test('создаёт новую задачу и закрывает диалог', async () => {
    const { user } = setup()

    await user.click(
      screen.getByRole('button', {
        name: 'Новая задача',
      }),
    )

    const dialog = screen.getByRole('dialog')

    expect(dialog).toBeInTheDocument()

    await user.type(
      screen.getByRole('textbox', {
        name: /Название задачи/,
      }),
      'Подготовить документацию',
    )

    await user.type(screen.getByLabelText(/Срок выполнения/), '2026-08-25')

    await user.click(
      screen.getByRole('button', {
        name: 'Создать задачу',
      }),
    )

    expect(createTaskMock).toHaveBeenCalledWith({
      title: 'Подготовить документацию',
      deadline: '2026-08-25',
      status: 'backlog',
      priority: 'medium',
      tag: '',
      assignee: '',
      spaceId: 'space-1',
    })

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
  })

  test('показывает ошибки и не закрывает диалог при пустой форме', async () => {
    const { user } = setup()

    await user.click(
      screen.getByRole('button', {
        name: 'Новая задача',
      }),
    )

    const dialog = screen.getByRole('dialog')

    await user.click(
      within(dialog).getByRole('button', {
        name: 'Создать задачу',
      }),
    )

    expect(
      await within(dialog).findByText('Введите название задачи'),
    ).toBeInTheDocument()

    expect(
      await within(dialog).findByText('Выберите срок выполнения'),
    ).toBeInTheDocument()

    expect(dialog).toBeInTheDocument()
  })

  test('передает статус выбранной колонки при создании задачи', async () => {
    const { user } = setup()

    const todoHeading = screen.getByRole('heading', {
      name: 'К выполнению',
    })

    const todoColumn = todoHeading.closest('section')

    if (!todoColumn) {
      throw new Error('Колонка «К выполнению» не найдена')
    }

    await user.click(
      within(todoColumn).getByRole('button', {
        name: 'Добавить задачу',
      }),
    )

    const dialog = screen.getByRole('dialog')

    expect(
      within(dialog).getByRole('combobox', {
        name: 'Статус',
      }),
    ).toHaveValue('todo')

    await user.type(
      within(dialog).getByRole('textbox', {
        name: /Название задачи/,
      }),
      'Проверить макеты',
    )

    await user.type(
      within(dialog).getByLabelText(/Срок выполнения/),
      '2026-08-25',
    )

    await user.click(
      within(dialog).getByRole('button', {
        name: 'Создать задачу',
      }),
    )

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })

    expect(createTaskMock).toHaveBeenCalledWith({
      title: 'Проверить макеты',
      deadline: '2026-08-25',
      status: 'todo',
      priority: 'medium',
      tag: '',
      assignee: '',
      spaceId: 'space-1',
    })
  })

  test('не удаляет задачу после отмены', async () => {
    const { user } = setup()

    await user.click(
      screen.getByRole('button', {
        name: 'Удалить задачу Исследовать конкурентов',
      }),
    )

    const dialog = screen.getByRole('alertdialog')

    expect(
      within(dialog).getByText('"Исследовать конкурентов"'),
    ).toBeInTheDocument()

    await user.click(within(dialog).getByRole('button', { name: 'Отмена' }))

    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument()
    expect(deleteTaskMock).not.toHaveBeenCalled()
  })

  test('отправляет запрос удаления и закрывает диалог', async () => {
    const { user } = setup()

    await user.click(
      screen.getByRole('button', {
        name: 'Удалить задачу Исследовать конкурентов',
      }),
    )

    const dialog = screen.getByRole('alertdialog')

    expect(
      within(dialog).getByText('"Исследовать конкурентов"'),
    ).toBeInTheDocument()

    await user.click(within(dialog).getByRole('button', { name: 'Удалить' }))

    await waitFor(() => {
      expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument()
    })

    expect(deleteTaskMock).toHaveBeenCalledWith('research')
  })

  test('отправляет изменения задачи и закрывает диалог', async () => {
    const { user } = setup()

    await user.click(
      screen.getByRole('button', {
        name: 'Редактировать задачу Исследовать конкурентов',
      }),
    )

    const dialog = screen.getByRole('dialog')

    const titleInput = within(dialog).getByRole('textbox', {
      name: /Название задачи/,
    })

    expect(titleInput).toHaveValue('Исследовать конкурентов')

    await user.clear(titleInput)

    await user.type(titleInput, 'Подготовить документацию')

    await user.click(within(dialog).getByRole('button', { name: 'Сохранить' }))

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })

    expect(editTaskMock).toHaveBeenCalledWith({
      taskId: 'research',
      body: {
        title: 'Подготовить документацию',
        deadline: '2026-08-15',
        status: 'backlog',
        priority: 'high',
        tag: 'Исследование',
        assignee: 'АМ',
      },
    })
  })

  test('не сохраняет изменения после отмены редактирования', async () => {
    const { user } = setup()

    await user.click(
      screen.getByRole('button', {
        name: 'Редактировать задачу Исследовать конкурентов',
      }),
    )

    const dialog = screen.getByRole('dialog')

    const titleInput = within(dialog).getByRole('textbox', {
      name: /Название задачи/,
    })

    expect(titleInput).toHaveValue('Исследовать конкурентов')

    await user.clear(titleInput)

    await user.type(titleInput, 'Подготовить документацию')

    await user.click(within(dialog).getByRole('button', { name: 'Отмена' }))

    expect(dialog).not.toBeInTheDocument()
    expect(editTaskMock).not.toHaveBeenCalled()
  })

  test('не сохраняет задачу с пустым названием', async () => {
    const { user } = setup()

    await user.click(
      screen.getByRole('button', {
        name: 'Редактировать задачу Исследовать конкурентов',
      }),
    )

    const dialog = screen.getByRole('dialog')

    const titleInput = within(dialog).getByRole('textbox', {
      name: /Название задачи/,
    })

    expect(titleInput).toHaveValue('Исследовать конкурентов')

    await user.clear(titleInput)

    await user.click(within(dialog).getByRole('button', { name: 'Сохранить' }))

    expect(
      await within(dialog).findByText('Введите название задачи'),
    ).toBeInTheDocument()

    expect(dialog).toBeInTheDocument()

    expect(
      screen.getByRole('link', {
        name: 'Исследовать конкурентов',
      }),
    ).toBeInTheDocument()
  })

  test('фильтрует задачи по поисковому запросу', async () => {
    const { user } = setup()

    const searchInput = screen.getByRole('searchbox', {
      name: 'Поиск задач',
    })

    await user.type(searchInput, 'Исследовать конкурентов')

    expect(
      screen.getByRole('link', {
        name: 'Исследовать конкурентов',
      }),
    ).toBeInTheDocument()

    await waitFor(() => {
      expect(
        screen.queryByRole('link', {
          name: 'Собрать UI-kit проекта',
        }),
      ).not.toBeInTheDocument()
    })

    await user.clear(searchInput)

    await waitFor(() => {
      expect(
        screen.getByRole('link', {
          name: 'Собрать UI-kit проекта',
        }),
      ).toBeInTheDocument()
    })
  })

  test('открывает и закрывает мобильный поиск', async () => {
    const { user } = setup()

    const searchButton = screen.getByRole('button', {
      name: 'Поиск',
    })

    expect(searchButton).toHaveAttribute('aria-expanded', 'false')
    expect(searchButton).toHaveAttribute('aria-controls', 'kanban-search-panel')

    expect(
      screen.queryByRole('searchbox', {
        name: 'Мобильный поиск задач',
      }),
    ).not.toBeInTheDocument()

    await user.click(searchButton)

    expect(searchButton).toHaveAttribute('aria-expanded', 'true')

    const mobileSearchInput = screen.getByRole('searchbox', {
      name: 'Мобильный поиск задач',
    })

    expect(mobileSearchInput).toBeInTheDocument()

    await user.type(mobileSearchInput, 'Исследовать конкурентов')

    expect(
      screen.getByRole('link', {
        name: 'Исследовать конкурентов',
      }),
    ).toBeInTheDocument()

    await waitFor(() => {
      expect(
        screen.queryByRole('link', {
          name: 'Собрать UI-kit проекта',
        }),
      ).not.toBeInTheDocument()
    })

    await user.click(searchButton)

    expect(searchButton).toHaveAttribute('aria-expanded', 'false')

    expect(
      screen.queryByRole('searchbox', {
        name: 'Мобильный поиск задач',
      }),
    ).not.toBeInTheDocument()

    await waitFor(() => {
      expect(
        screen.getByRole('link', {
          name: 'Собрать UI-kit проекта',
        }),
      ).toBeInTheDocument()
    })
  })

  test('фильтрует задачи по выбранной категории', async () => {
    const { user } = setup()

    const filtersButton = screen.getByRole('button', {
      name: 'Фильтры',
    })

    expect(filtersButton).toHaveAttribute('aria-expanded', 'false')
    expect(filtersButton).toHaveAttribute(
      'aria-controls',
      'kanban-filters-panel',
    )

    await user.click(filtersButton)

    expect(filtersButton).toHaveAttribute('aria-expanded', 'true')

    const categorySelect = screen.getByRole('combobox', {
      name: 'Добавить категорию',
    })

    await user.selectOptions(categorySelect, 'Исследование')

    const selectedCategories = screen.getByLabelText(
      'Выбранные категории Kanban',
    )

    expect(
      within(selectedCategories).getByText('Исследование'),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('link', {
        name: 'Исследовать конкурентов',
      }),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('link', {
        name: 'Анализ текущего сайта',
      }),
    ).toBeInTheDocument()

    expect(
      screen.queryByRole('link', {
        name: 'Собрать UI-kit проекта',
      }),
    ).not.toBeInTheDocument()
  })

  test('удаляет выбранную категорию и сбрасывает фильтрацию', async () => {
    const { user } = setup()

    await user.click(
      screen.getByRole('button', {
        name: 'Фильтры',
      }),
    )

    await user.selectOptions(
      screen.getByRole('combobox', {
        name: 'Добавить категорию',
      }),
      'Исследование',
    )

    expect(
      screen.queryByRole('link', {
        name: 'Собрать UI-kit проекта',
      }),
    ).not.toBeInTheDocument()

    const selectedCategories = screen.getByLabelText(
      'Выбранные категории Kanban',
    )

    await user.click(
      screen.getByRole('button', {
        name: 'Удалить категорию Исследование',
      }),
    )

    expect(
      within(selectedCategories).queryByText('Исследование'),
    ).not.toBeInTheDocument()

    expect(
      within(selectedCategories).getByText('Фильтры не выбраны'),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('link', {
        name: 'Собрать UI-kit проекта',
      }),
    ).toBeInTheDocument()
  })

  test('сбрасывает все выбранные категории', async () => {
    const { user } = setup()

    await user.click(
      screen.getByRole('button', {
        name: 'Фильтры',
      }),
    )

    const categorySelect = screen.getByRole('combobox', {
      name: 'Добавить категорию',
    })

    await user.selectOptions(categorySelect, 'Исследование')
    await user.selectOptions(categorySelect, 'Дизайн')

    const selectedCategories = screen.getByLabelText(
      'Выбранные категории Kanban',
    )
    const resetButton = screen.getByRole('button', {
      name: 'Сбросить все',
    })

    expect(
      within(selectedCategories).getByText('Исследование'),
    ).toBeInTheDocument()

    expect(within(selectedCategories).getByText('Дизайн')).toBeInTheDocument()

    expect(resetButton).toBeEnabled()

    expect(
      screen.queryByRole('link', {
        name: 'Настроить авторизацию',
      }),
    ).not.toBeInTheDocument()

    await user.click(resetButton)

    expect(
      within(selectedCategories).queryByText('Исследование'),
    ).not.toBeInTheDocument()

    expect(
      within(selectedCategories).queryByText('Дизайн'),
    ).not.toBeInTheDocument()

    expect(
      within(selectedCategories).getByText('Фильтры не выбраны'),
    ).toBeInTheDocument()

    expect(resetButton).toBeDisabled()

    expect(
      screen.getByRole('link', {
        name: 'Настроить авторизацию',
      }),
    ).toBeInTheDocument()
  })

  test('показывает ошибку создания задачи и сбрасывает ее при закрытии', async () => {
    mutationStateMock.error = {
      status: 500,
      data: {
        error: 'Internal server error',
      },
    }

    const { user } = setup()

    await user.click(
      screen.getByRole('button', {
        name: 'Новая задача',
      }),
    )

    const dialog = screen.getByRole('dialog')

    expect(within(dialog).getByRole('alert')).toHaveTextContent(
      'Не удалось создать задачу. Попробуйте еще раз.',
    )

    await user.click(
      within(dialog).getByRole('button', {
        name: 'Закрыть окно создания задачи',
      }),
    )

    expect(mutationStateMock.reset).toHaveBeenCalledTimes(1)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  test('не закрывает диалог при ошибке создания задачи', async () => {
    createTaskMock.mockReturnValueOnce({
      unwrap: vi.fn().mockRejectedValue(new Error('Request failed')),
    })

    const { user } = setup()

    await user.click(
      screen.getByRole('button', {
        name: 'Новая задача',
      }),
    )

    const dialog = screen.getByRole('dialog')

    await user.type(
      within(dialog).getByRole('textbox', {
        name: /Название задачи/,
      }),
      'Новая задача',
    )

    await user.type(
      within(dialog).getByLabelText(/Срок выполнения/),
      '2026-08-25',
    )

    await user.click(
      within(dialog).getByRole('button', {
        name: 'Создать задачу',
      }),
    )

    await waitFor(() => {
      expect(createTaskMock).toHaveBeenCalled()
    })

    expect(dialog).toBeInTheDocument()
  })

  test('показывает скелетон во время загрузки задач', () => {
    tasksQueryStateMock.data = undefined
    tasksQueryStateMock.isLoading = true

    setup()

    expect(screen.getByRole('status')).toHaveTextContent('Загружаем задачи...')

    expect(
      screen.queryByRole('heading', {
        name: 'Бэклог',
      }),
    ).not.toBeInTheDocument()
  })

  test('показывает ошибку загрузки задач', () => {
    tasksQueryStateMock.data = undefined
    tasksQueryStateMock.error = {
      status: 500,
      data: {
        error: 'Internal server error',
      },
    }

    setup()

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Не удалось загрузить задачи',
    )

    expect(
      screen.queryByRole('heading', {
        name: 'Бэклог',
      }),
    ).not.toBeInTheDocument()
  })

  test('показывает ошибку редактирования и сбрасывает ее при закрытии', async () => {
    const { user, rerender } = setup()

    await user.click(
      screen.getByRole('button', {
        name: 'Редактировать задачу Исследовать конкурентов',
      }),
    )

    editMutationStateMock.error = {
      status: 500,
      data: { error: 'Internal server error' },
    }

    rerender(
      <StoreProvider>
        <KanbanBoard spaceId="space-1" />
      </StoreProvider>,
    )

    const dialog = screen.getByRole('dialog')

    expect(within(dialog).getByRole('alert')).toHaveTextContent(
      'Не удалось сохранить задачу. Попробуйте еще раз.',
    )

    editMutationStateMock.reset.mockClear()

    await user.click(
      within(dialog).getByRole('button', {
        name: 'Закрыть окно редактирования задачи',
      }),
    )

    expect(editMutationStateMock.reset).toHaveBeenCalledOnce()
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  test('показывает ошибку удаления и сбрасывает ее при закрытии', async () => {
    const { user, rerender } = setup()

    await user.click(
      screen.getByRole('button', {
        name: 'Удалить задачу Исследовать конкурентов',
      }),
    )

    deleteMutationStateMock.error = {
      status: 500,
      data: { error: 'Internal server error' },
    }

    rerender(
      <StoreProvider>
        <KanbanBoard spaceId="space-1" />
      </StoreProvider>,
    )

    const dialog = screen.getByRole('alertdialog')

    expect(within(dialog).getByRole('alert')).toHaveTextContent(
      'Не удалось удалить задачу. Попробуйте еще раз.',
    )

    deleteMutationStateMock.reset.mockClear()

    await user.click(
      within(dialog).getByRole('button', {
        name: 'Закрыть окно удаления задачи',
      }),
    )

    expect(deleteMutationStateMock.reset).toHaveBeenCalledOnce()
    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument()
  })

  test('блокирует кнопку во время удаления задачи', async () => {
    deleteMutationStateMock.isLoading = true

    const { user } = setup()

    await user.click(
      screen.getByRole('button', {
        name: 'Удалить задачу Исследовать конкурентов',
      }),
    )

    const dialog = screen.getByRole('alertdialog')
    const deleteButton = within(dialog).getByRole('button', {
      name: 'Удаление...',
    })

    expect(deleteButton).toBeDisabled()
  })
})
