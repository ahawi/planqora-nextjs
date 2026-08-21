import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test } from 'vitest'

import { TaskExplorer } from './task-explorer'

describe('TaskExplorer', () => {
  test('фильтрует карточки при вводе поискового запроса', async () => {
    const user = userEvent.setup()

    render(<TaskExplorer />)

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
    const user = userEvent.setup()

    render(<TaskExplorer />)

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
    const user = userEvent.setup()

    render(<TaskExplorer />)

    const categorySelect = screen.getByRole('combobox', {
      name: 'Категория задачи',
    })

    await user.selectOptions(categorySelect, 'UX')
    await user.selectOptions(categorySelect, 'UX')

    const chips = screen.getByLabelText('Выбранные категории')

    expect(within(chips).getAllByText('UX')).toHaveLength(1)
  })

  test('удаление чипа возвращает задачи этой категории', async () => {
    const user = userEvent.setup()

    render(<TaskExplorer />)

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
    const user = userEvent.setup()

    render(<TaskExplorer />)

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
    const user = userEvent.setup()

    render(<TaskExplorer />)

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
})
