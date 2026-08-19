import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test } from 'vitest'

import { KanbanBoard } from './kanban-board'

describe('KanbanBoard', () => {
  test('перемещает задачу в следующую колонку', async () => {
    const user = userEvent.setup()

    render(<KanbanBoard />)

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
    const user = userEvent.setup()

    render(<KanbanBoard />)

    await user.click(
      screen.getByRole('button', {
        name: 'Новая задача',
      }),
    )

    expect(screen.getByRole('dialog')).toBeInTheDocument()

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
    const user = userEvent.setup()

    render(<KanbanBoard />)

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
    const user = userEvent.setup()

    render(<KanbanBoard />)

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
})
