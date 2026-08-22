import { act, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, test, vi } from 'vitest'

import { SignInForm } from './sign-in-form'

const { pushMock, refreshMock, signInEmailMock } = vi.hoisted(() => ({
  pushMock: vi.fn(),
  refreshMock: vi.fn(),
  signInEmailMock: vi.fn(),
}))

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: pushMock,
    refresh: refreshMock,
  }),
}))

vi.mock('@/src/shared/lib/auth-client', () => ({
  authClient: {
    signIn: {
      email: signInEmailMock,
    },
  },
}))

const setup = () => {
  const user = userEvent.setup()

  render(<SignInForm />)

  return { user }
}

const fillValidForm = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.type(
    screen.getByRole('textbox', { name: 'Email' }),
    'ivan@example.com',
  )
  await user.type(screen.getByLabelText('Пароль'), 'password123')
}

describe('SignInForm', () => {
  beforeEach(() => {
    signInEmailMock.mockResolvedValue({ data: null, error: null })
  })

  test('показывает ошибки и не отправляет пустую форму', async () => {
    const { user } = setup()

    await user.click(screen.getByRole('button', { name: 'Войти' }))

    expect(
      await screen.findByText('Введите корректный email'),
    ).toBeInTheDocument()
    expect(screen.getByText('Введите пароль')).toBeInTheDocument()
    expect(await screen.findAllByRole('alert')).toHaveLength(2)
    expect(signInEmailMock).not.toHaveBeenCalled()
  })

  test('отправляет email и пароль в Better Auth', async () => {
    const { user } = setup()
    await fillValidForm(user)

    await user.click(screen.getByRole('button', { name: 'Войти' }))

    await waitFor(() => {
      expect(signInEmailMock).toHaveBeenCalledWith({
        email: 'ivan@example.com',
        password: 'password123',
      })
    })
  })

  test('показывает ошибку Better Auth и не перенаправляет', async () => {
    signInEmailMock.mockResolvedValue({
      data: null,
      error: { message: 'Неверный email или пароль' },
    })
    const { user } = setup()
    await fillValidForm(user)

    await user.click(screen.getByRole('button', { name: 'Войти' }))

    expect(
      await screen.findByText('Неверный email или пароль', {
        selector: '[role="alert"]',
      }),
    ).toBeInTheDocument()
    expect(pushMock).not.toHaveBeenCalled()
    expect(refreshMock).not.toHaveBeenCalled()
  })

  test('перенаправляет после успешного входа', async () => {
    const { user } = setup()
    await fillValidForm(user)

    await user.click(screen.getByRole('button', { name: 'Войти' }))

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith('/')
      expect(refreshMock).toHaveBeenCalledOnce()
    })
  })

  test('блокирует кнопку, пока запрос выполняется', async () => {
    let resolveRequest: ((value: { data: null; error: null }) => void) | null =
      null
    signInEmailMock.mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveRequest = resolve
        }),
    )
    const { user } = setup()
    await fillValidForm(user)

    await user.click(screen.getByRole('button', { name: 'Войти' }))

    expect(
      await screen.findByRole('button', { name: 'Вход...' }),
    ).toBeDisabled()

    await act(async () => {
      resolveRequest?.({ data: null, error: null })
    })

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith('/')
    })
  })
})
