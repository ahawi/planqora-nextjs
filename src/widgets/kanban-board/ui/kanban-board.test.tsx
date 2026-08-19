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
})
