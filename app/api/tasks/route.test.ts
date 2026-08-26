import { beforeEach, describe, expect, test, vi } from 'vitest'

import { GET, POST } from './route'

const { createMock, findFirstMock, findManyMock, getSessionMock } = vi.hoisted(
  () => ({
    createMock: vi.fn(),
    findFirstMock: vi.fn(),
    findManyMock: vi.fn(),
    getSessionMock: vi.fn(),
  }),
)

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
      findFirst: findFirstMock,
    },
    task: {
      create: createMock,
      findMany: findManyMock,
    },
  },
}))

const createRequest = () =>
  new Request('http://localhost/api/tasks?spaceId=space-1')

describe('GET /api/tasks', () => {
  beforeEach(() => {
    vi.clearAllMocks()

    getSessionMock.mockResolvedValue({
      user: {
        id: 'user-1',
      },
    })

    findManyMock.mockResolvedValue([])
  })

  test('возвращает 401 без авторизации', async () => {
    getSessionMock.mockResolvedValue(null)

    const response = await GET(createRequest())
    const body = await response.json()

    expect(response.status).toBe(401)
    expect(body).toEqual({ error: 'Unauthorized' })
    expect(findManyMock).not.toHaveBeenCalled()
  })

  test('возвращает все задачи пользователя без идентификатора пространства', async () => {
    const request = new Request('http://localhost/api/tasks')

    const response = await GET(request)
    const body = await response.json()

    expect(response.status).toBe(200)
    expect(body).toEqual({ tasks: [] })

    expect(findManyMock).toHaveBeenCalledWith(
      expect.objectContaining({
        where: {
          space: {
            ownerId: 'user-1',
          },
        },
      }),
    )
  })

  test('возвращает 500 при ошибке базы данных', async () => {
    findManyMock.mockRejectedValue(new Error('Database error'))

    const response = await GET(createRequest())
    const body = await response.json()

    expect(response.status).toBe(500)
    expect(body).toEqual({ error: 'Internal server error' })
  })

  test('возвращает преобразованные задачи текущего пользователя', async () => {
    const tasks = [
      {
        assignee: 'Иван',
        commentsCount: 2,
        deadline: new Date('2026-08-30T00:00:00.000Z'),
        id: 'task-1',
        priority: 'HIGH',
        progress: 50,
        space: {
          id: 'space-1',
          title: 'Редизайн сайта',
        },
        status: 'TODO',
        tag: 'Разработка',
        title: 'Собрать API',
      },
    ]

    findManyMock.mockResolvedValue(tasks)

    const response = await GET(createRequest())
    const body = await response.json()

    expect(response.status).toBe(200)
    expect(body).toEqual({
      tasks: [
        {
          assignee: 'Иван',
          comments: 2,
          coverTone: 'warning',
          deadline: '2026-08-30',
          id: 'task-1',
          priority: 'high',
          progress: 50,
          space: 'Редизайн сайта',
          status: 'todo',
          tag: 'Разработка',
          title: 'Собрать API',
        },
      ],
    })
    expect(findManyMock).toHaveBeenCalledWith({
      where: {
        spaceId: 'space-1',
        space: {
          ownerId: 'user-1',
        },
      },
      select: {
        id: true,
        title: true,
        deadline: true,
        status: true,
        priority: true,
        tag: true,
        progress: true,
        assignee: true,
        commentsCount: true,
        space: {
          select: {
            id: true,
            title: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
  })
})

const validInput = {
  title: 'Изучить Prisma',
  deadline: '2026-08-30',
  status: 'todo',
  priority: 'medium',
  tag: 'Backend',
  assignee: 'Иван',
  spaceId: 'space-1',
}

const createPostRequest = (body = JSON.stringify(validInput)) =>
  new Request('http://localhost/api/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  })

describe('POST /api/tasks', () => {
  beforeEach(() => {
    vi.clearAllMocks()

    getSessionMock.mockResolvedValue({
      user: {
        id: 'user-1',
      },
    })

    findFirstMock.mockResolvedValue({
      id: 'space-1',
    })

    createMock.mockResolvedValue({
      assignee: 'Иван',
      commentsCount: 0,
      deadline: new Date('2026-08-30T00:00:00.000Z'),
      id: 'task-1',
      priority: 'MEDIUM',
      progress: 0,
      space: {
        id: 'space-1',
        title: 'Обучение',
      },
      status: 'TODO',
      tag: 'Backend',
      title: 'Изучить Prisma',
    })
  })

  test('возвращает 401 без авторизации', async () => {
    getSessionMock.mockResolvedValue(null)

    const response = await POST(createPostRequest())
    const body = await response.json()

    expect(response.status).toBe(401)
    expect(body).toEqual({ error: 'Unauthorized' })
    expect(findFirstMock).not.toHaveBeenCalled()
    expect(createMock).not.toHaveBeenCalled()
  })

  test('возвращает 400 для некорректного JSON', async () => {
    const response = await POST(createPostRequest('{'))
    const body = await response.json()

    expect(response.status).toBe(400)
    expect(body).toEqual({ error: 'Invalid JSON' })
    expect(findFirstMock).not.toHaveBeenCalled()
    expect(createMock).not.toHaveBeenCalled()
  })

  test('возвращает 400 для невалидных данных', async () => {
    const response = await POST(
      createPostRequest(
        JSON.stringify({
          ...validInput,
          title: ' ',
        }),
      ),
    )
    const body = await response.json()

    expect(response.status).toBe(400)
    expect(body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          message: 'Введите название задачи',
          path: ['title'],
        }),
      ]),
    )
    expect(findFirstMock).not.toHaveBeenCalled()
    expect(createMock).not.toHaveBeenCalled()
  })

  test('возвращает 404 для недоступного пространства', async () => {
    findFirstMock.mockResolvedValue(null)

    const response = await POST(createPostRequest())
    const body = await response.json()

    expect(response.status).toBe(404)
    expect(body).toEqual({ error: 'Space not found' })
    expect(findFirstMock).toHaveBeenCalledWith({
      where: {
        id: 'space-1',
        ownerId: 'user-1',
      },
      select: {
        id: true,
      },
    })
    expect(createMock).not.toHaveBeenCalled()
  })

  test('создаёт и возвращает задачу', async () => {
    const response = await POST(createPostRequest())
    const body = await response.json()

    expect(response.status).toBe(201)
    expect(body).toEqual({
      task: {
        assignee: 'Иван',
        comments: 0,
        coverTone: 'primary',
        deadline: '2026-08-30',
        id: 'task-1',
        priority: 'medium',
        progress: 0,
        space: 'Обучение',
        status: 'todo',
        tag: 'Backend',
        title: 'Изучить Prisma',
      },
    })

    expect(createMock).toHaveBeenCalledWith({
      data: {
        title: 'Изучить Prisma',
        deadline: new Date('2026-08-30T00:00:00.000Z'),
        status: 'TODO',
        priority: 'MEDIUM',
        tag: 'Backend',
        assignee: 'Иван',
        spaceId: 'space-1',
        completedAt: null,
      },
      include: {
        space: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    })
  })

  test('возвращает 500 при ошибке создания задачи', async () => {
    createMock.mockRejectedValue(new Error('Database error'))

    const response = await POST(createPostRequest())
    const body = await response.json()

    expect(response.status).toBe(500)
    expect(body).toEqual({ error: 'Internal server error' })
  })

  test('записывает дату при создании завершенной задачи', async () => {
    const response = await POST(
      createPostRequest(JSON.stringify({ ...validInput, status: 'done' })),
    )

    expect(response.status).toBe(201)
    expect(createMock).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          status: 'DONE',
          completedAt: expect.any(Date),
        }),
      }),
    )
  })
})
