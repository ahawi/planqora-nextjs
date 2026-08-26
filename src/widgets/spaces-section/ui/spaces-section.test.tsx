import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, test, vi } from 'vitest'

import { type Space, spacesMock } from '@/src/entities/space'

import { SpacesSection } from './spaces-section'

const { spacesQueryStateMock } = vi.hoisted(() => ({
  spacesQueryStateMock: {
    data: undefined as Space[] | undefined,
    isLoading: false,
    error: undefined as unknown,
  },
}))

vi.mock('@/src/entities/space', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/src/entities/space')>()

  return {
    ...actual,
    useGetSpacesQuery: () => spacesQueryStateMock,
  }
})

const setup = () => {
  render(<SpacesSection />)
}

beforeEach(() => {
  vi.clearAllMocks()

  spacesQueryStateMock.data = spacesMock.map((space) => ({ ...space }))
  spacesQueryStateMock.isLoading = false
  spacesQueryStateMock.error = undefined
})

describe('SpacesSection', () => {
  test('показывает пространства пользователя', () => {
    setup()

    expect(
      screen.getByRole('heading', {
        name: 'Пространства',
      }),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('heading', {
        name: 'Редизайн сайта',
      }),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('heading', {
        name: 'Мобильное приложение',
      }),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('heading', {
        name: 'Маркетинг',
      }),
    ).toBeInTheDocument()
  })

  test('показывает состояние загрузки', () => {
    spacesQueryStateMock.data = undefined
    spacesQueryStateMock.isLoading = true

    setup()

    expect(screen.getByRole('status')).toHaveTextContent(
      'Загрузка пространств...',
    )

    expect(
      screen.queryByRole('heading', {
        name: 'Пространства',
      }),
    ).not.toBeInTheDocument()
  })

  test('показывает ошибку загрузки', () => {
    spacesQueryStateMock.data = undefined
    spacesQueryStateMock.error = { status: 500 }

    setup()

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Не удалось загрузить пространства',
    )

    expect(
      screen.queryByRole('heading', {
        name: 'Пространства',
      }),
    ).not.toBeInTheDocument()
  })

  test('не показывает секцию при пустом списке пространств', () => {
    spacesQueryStateMock.data = []

    setup()

    expect(
      screen.queryByRole('heading', {
        name: 'Пространства',
      }),
    ).not.toBeInTheDocument()
  })
})
