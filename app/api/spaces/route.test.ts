import { beforeEach, describe, expect, test, vi } from 'vitest'

import { GET } from './route'

const { findManyMock, getSessionMock } = vi.hoisted(() => ({
  findManyMock: vi.fn(),
  getSessionMock: vi.fn(),
}))

vi.mock('@/src/shared/lib/server/auth', () => ({
  auth: {
    api: {
      getSession: getSessionMock,
    },
  },
}))

vi.mock('@/src/shared/lib/server/prisma', () => ({
  prisma: {
    space: {
      findMany: findManyMock,
    },
  },
}))

const createRequest = () => new Request('http://localhost/api/spaces')

beforeEach(() => {
  vi.clearAllMocks()

  getSessionMock.mockResolvedValue({
    user: {
      id: 'user-1',
    },
  })

  findManyMock.mockResolvedValue([])
})

describe('GET /api/spaces', () => {
  test('возвращает 401 без авторизации', async () => {
    getSessionMock.mockResolvedValue(null)

    const response = await GET(createRequest())
    const body = await response.json()

    expect(response.status).toBe(401)
    expect(body).toEqual({ error: 'Unauthorized' })
    expect(findManyMock).not.toHaveBeenCalled()
  })

  test('возвращает пространства текущего пользователя', async () => {
    findManyMock.mockResolvedValue([
      {
        id: 'space-1',
        title: 'Редизайн сайта',
        description: 'Дизайн и разработка',
        tasks: [{ progress: 50 }, { progress: 100 }],
      },
    ])

    const response = await GET(createRequest())
    const body = await response.json()

    expect(response.status).toBe(200)

    expect(body).toEqual({
      spaces: [
        {
          id: 'space-1',
          title: 'Редизайн сайта',
          description: 'Дизайн и разработка',
          icon: 'РС',
          tasks: 2,
          progress: 75,
          tone: 'success',
        },
      ],
    })

    expect(findManyMock).toHaveBeenCalledWith({
      where: {
        ownerId: 'user-1',
      },
      select: {
        id: true,
        title: true,
        description: true,
        tasks: {
          select: {
            progress: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
  })

  test('возвращает 500 при ошибке базы данных', async () => {
    findManyMock.mockRejectedValue(new Error('Database error'))

    const response = await GET(createRequest())
    const body = await response.json()

    expect(response.status).toBe(500)
    expect(body).toEqual({ error: 'Internal server error' })
  })
})
