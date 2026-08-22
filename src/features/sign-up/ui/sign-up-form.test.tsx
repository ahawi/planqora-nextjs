import { act, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, test, vi } from 'vitest'

import { SignUpForm } from './sign-up-form'

const { pushMock, refreshMock, signUpEmailMock } = vi.hoisted(() => ({
  pushMock: vi.fn(),
  refreshMock: vi.fn(),
  signUpEmailMock: vi.fn(),
}))

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: pushMock,
    refresh: refreshMock,
  }),
}))

vi.mock('@/src/shared/lib/auth-client', () => ({
  authClient: {
    signUp: {
      email: signUpEmailMock,
    },
  },
}))

const setup = () => {
  const user = userEvent.setup()

  render(<SignUpForm />)

  return { user }
}

const fillValidForm = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.type(screen.getByRole('textbox', { name: 'Имя' }), 'Иван')
  await user.type(
    screen.getByRole('textbox', { name: 'Email' }),
    'ivan@example.com',
  )
  await user.type(screen.getByLabelText('Пароль'), 'password123')
  await user.type(screen.getByLabelText('Повторите пароль'), 'password123')
}

describe('SignUpForm', () => {
  beforeEach(() => {
    signUpEmailMock.mockResolvedValue({ data: null, error: null })
  })

  test('показывает ошибки и не отправляет пустую форму', async () => {
    const { user } = setup()

    await user.click(screen.getByRole('button', { name: 'Зарегистрироваться' }))

    expect(await screen.findByText('Минимум 2 символа')).toBeInTheDocument()
    expect(screen.getByText('Минимум 8 символов')).toBeInTheDocument()
    expect(
      screen.getByText('Повторите пароль', { selector: '[role="alert"]' }),
    ).toBeInTheDocument()
    expect(await screen.findAllByRole('alert')).toHaveLength(4)
    expect(signUpEmailMock).not.toHaveBeenCalled()
  })

  test('отправляет в Better Auth только данные регистрации', async () => {
    const { user } = setup()
    await fillValidForm(user)

    await user.click(screen.getByRole('button', { name: 'Зарегистрироваться' }))

    await waitFor(() => {
      expect(signUpEmailMock).toHaveBeenCalledWith({
        name: 'Иван',
        email: 'ivan@example.com',
        password: 'password123',
      })
    })

    expect(signUpEmailMock.mock.calls[0][0]).not.toHaveProperty(
      'confirmPassword',
    )
  })

  test('показывает ошибку Better Auth и не перенаправляет', async () => {
    signUpEmailMock.mockResolvedValue({
      data: null,
      error: { message: 'Пользователь с таким email уже существует' },
    })
    const { user } = setup()
    await fillValidForm(user)

    await user.click(screen.getByRole('button', { name: 'Зарегистрироваться' }))

    expect(
      await screen.findByText('Пользователь с таким email уже существует', {
        selector: '[role="alert"]',
      }),
    ).toBeInTheDocument()
    expect(pushMock).not.toHaveBeenCalled()
    expect(refreshMock).not.toHaveBeenCalled()
  })

  test('перенаправляет после успешной регистрации', async () => {
    const { user } = setup()
    await fillValidForm(user)

    await user.click(screen.getByRole('button', { name: 'Зарегистрироваться' }))

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith('/')
      expect(refreshMock).toHaveBeenCalledOnce()
    })
  })

  test('блокирует кнопку, пока запрос выполняется', async () => {
    let resolveRequest: ((value: { data: null; error: null }) => void) | null =
      null
    signUpEmailMock.mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveRequest = resolve
        }),
    )
    const { user } = setup()
    await fillValidForm(user)

    await user.click(screen.getByRole('button', { name: 'Зарегистрироваться' }))

    expect(
      await screen.findByRole('button', { name: 'Регистрация...' }),
    ).toBeDisabled()

    await act(async () => {
      resolveRequest?.({ data: null, error: null })
    })

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith('/')
    })
  })
})
