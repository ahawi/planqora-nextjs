import { act, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, test, vi } from 'vitest'

import { SignOutButton } from './sign-out-button'

const { replaceMock, signOutMock } = vi.hoisted(() => ({
  replaceMock: vi.fn(),
  signOutMock: vi.fn(),
}))

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    replace: replaceMock,
  }),
}))

vi.mock('@/src/shared/lib/auth-client', () => ({
  authClient: {
    signOut: signOutMock,
  },
}))

const setup = () => {
  const user = userEvent.setup()

  render(<SignOutButton />)

  return { user }
}

describe('SignOutButton', () => {
  beforeEach(() => {
    signOutMock.mockResolvedValue({ data: null, error: null })
  })

  test('выходит из аккаунта и перенаправляет на страницу входа', async () => {
    const { user } = setup()

    await user.click(screen.getByRole('button', { name: 'Выйти' }))

    await waitFor(() => {
      expect(signOutMock).toHaveBeenCalledOnce()
      expect(replaceMock).toHaveBeenCalledWith('/sign-in')
    })
  })

  test('блокирует кнопку, пока запрос выполняется', async () => {
    let resolveRequest: ((value: { data: null; error: null }) => void) | null =
      null
    signOutMock.mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveRequest = resolve
        }),
    )
    const { user } = setup()

    await user.click(screen.getByRole('button', { name: 'Выйти' }))

    expect(
      await screen.findByRole('button', { name: 'Выход...' }),
    ).toBeDisabled()

    await act(async () => {
      resolveRequest?.({ data: null, error: null })
    })

    await waitFor(() => {
      expect(replaceMock).toHaveBeenCalledWith('/sign-in')
    })
  })

  test('показывает ошибку Better Auth и не перенаправляет', async () => {
    signOutMock.mockResolvedValue({
      data: null,
      error: { message: 'Не удалось завершить сессию' },
    })
    const { user } = setup()

    await user.click(screen.getByRole('button', { name: 'Выйти' }))

    expect(
      await screen.findByText('Не удалось завершить сессию', {
        selector: '[role="alert"]',
      }),
    ).toBeInTheDocument()
    expect(replaceMock).not.toHaveBeenCalled()
  })

  test('показывает запасное сообщение при неожиданной ошибке', async () => {
    signOutMock.mockRejectedValue(new Error('Network error'))
    const { user } = setup()

    await user.click(screen.getByRole('button', { name: 'Выйти' }))

    expect(
      await screen.findByText('Не удалось выполнить выход', {
        selector: '[role="alert"]',
      }),
    ).toBeInTheDocument()
    expect(replaceMock).not.toHaveBeenCalled()
  })
})
