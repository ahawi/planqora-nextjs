import { fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'

import { DashboardAside } from './dashboard-aside'

const setup = () => {
  render(<DashboardAside />)
}

beforeEach(() => {
  vi.useFakeTimers()
  vi.setSystemTime(new Date(2026, 7, 27, 12))
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
})
