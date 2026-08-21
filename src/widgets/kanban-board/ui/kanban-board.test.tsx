import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test } from 'vitest'

import { KanbanBoard } from './kanban-board'

const setup = () => {
  const user = userEvent.setup()

  render(<KanbanBoard />)

  return { user }
}
describe('KanbanBoard', () => {
  test('перемещает задачу в следующую колонку', async () => {
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
    expect(
      within(backlogColumn).queryByRole('link', {
        name: 'Исследовать конкурентов',
      }),
    ).not.toBeInTheDocument()

    expect(
      within(todoColumn).getByRole('link', {
        name: 'Исследовать конкурентов',
      }),
    ).toBeInTheDocument()
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

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

    const backlogHeading = screen.getByRole('heading', {
      name: 'Бэклог',
    })

    const backlogColumn = backlogHeading.closest('section')

    if (!backlogColumn) {
      throw new Error('Колонка бэклога не найдена')
    }

    expect(
      within(backlogColumn).getByRole('link', {
        name: 'Подготовить документацию',
      }),
    ).toBeInTheDocument()
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

  test('создаёт задачу в выбранной колонке', async () => {
    const { user } = setup()

    const todoHeading = screen.getByRole('heading', {
      name: 'К выполнению',
    })

    const backlogHeading = screen.getByRole('heading', {
      name: 'Бэклог',
    })

    const todoColumn = todoHeading.closest('section')
    const backlogColumn = backlogHeading.closest('section')

    if (!todoColumn || !backlogColumn) {
      throw new Error('Колонки канбан-доски не найдены')
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

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

    expect(
      within(todoColumn).getByRole('link', {
        name: 'Проверить макеты',
      }),
    ).toBeInTheDocument()

    expect(
      within(backlogColumn).queryByRole('link', {
        name: 'Проверить макеты',
      }),
    ).not.toBeInTheDocument()
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

    expect(
      screen.getByRole('link', {
        name: 'Исследовать конкурентов',
      }),
    ).toBeInTheDocument()
  })

  test('подтверждение удаления закрывает диалог и убирает карточку из колонки', async () => {
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

    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument()

    expect(
      screen.queryByRole('link', {
        name: 'Исследовать конкурентов',
      }),
    ).not.toBeInTheDocument()

    expect(screen.getByText(/7 задач/)).toBeInTheDocument()
  })

  test('редактирует задачу и закрывает диалог', async () => {
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

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

    expect(
      screen.getByRole('link', {
        name: 'Подготовить документацию',
      }),
    ).toBeInTheDocument()

    expect(
      screen.queryByRole('link', {
        name: 'Исследовать конкурентов',
      }),
    ).not.toBeInTheDocument()
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

    expect(
      screen.getByRole('link', {
        name: 'Исследовать конкурентов',
      }),
    ).toBeInTheDocument()

    expect(
      screen.queryByRole('link', {
        name: 'Подготовить документацию',
      }),
    ).not.toBeInTheDocument()
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
})
