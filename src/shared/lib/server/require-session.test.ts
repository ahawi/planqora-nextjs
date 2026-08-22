import { beforeEach, describe, expect, test, vi } from 'vitest'

import { requireSession } from './require-session'

const { getSessionMock, headersMock, redirectMock } = vi.hoisted(() => ({
  getSessionMock: vi.fn(),
  headersMock: vi.fn(),
  redirectMock: vi.fn(),
}))

vi.mock('react', () => ({
  cache: (callback: unknown) => callback,
}))

vi.mock('next/headers', () => ({
  headers: headersMock,
}))

vi.mock('next/navigation', () => ({
  redirect: redirectMock,
}))

vi.mock('./auth', () => ({
  auth: {
    api: {
      getSession: getSessionMock,
    },
  },
}))

describe('requireSession', () => {
  const requestHeaders = new Headers()

  beforeEach(() => {
    headersMock.mockResolvedValue(requestHeaders)

    redirectMock.mockImplementation(() => {
      throw new Error('NEXT_REDIRECT')
    })
  })

  test('возвращает текущую сессию', async () => {
    const session = {
      session: { id: 'session-1' },
      user: {
        id: 'user-1',
        name: 'Иван',
        email: 'ivan@example.com',
      },
    }

    getSessionMock.mockResolvedValue(session)

    const result = await requireSession()

    expect(headersMock).toHaveBeenCalledOnce()
    expect(getSessionMock).toHaveBeenCalledWith({ headers: requestHeaders })
    expect(result).toEqual(session)
    expect(redirectMock).not.toHaveBeenCalled()
  })

  test('перенаправляет на страницу входа без сессии', async () => {
    getSessionMock.mockResolvedValue(null)

    await expect(requireSession()).rejects.toThrow('NEXT_REDIRECT')

    expect(redirectMock).toHaveBeenCalledWith('/sign-in')
  })
})
