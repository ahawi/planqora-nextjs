import { beforeEach, describe, expect, test, vi } from 'vitest'

import { DELETE, PATCH } from './route'

const { findFirstMock, getSessionMock, updateMock, deleteManyMock } =
  vi.hoisted(() => ({
    findFirstMock: vi.fn(),
    getSessionMock: vi.fn(),
    updateMock: vi.fn(),
    deleteManyMock: vi.fn(),
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
    task: {
      findFirst: findFirstMock,
      update: updateMock,
      deleteMany: deleteManyMock,
    },
  },
}))

const validInput = {
  title: 'Сделать макет',
  deadline: '2026-08-30',
  status: 'in-progress',
  priority: 'high',
  tag: 'Backend',
  assignee: 'Иван',
}

const createPatchRequest = (body = JSON.stringify(validInput)) =>
  new Request('http://localhost/api/tasks/task-1', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  })

const createContext = () => ({
  params: Promise.resolve({
    taskId: 'task-1',
  }),
})

describe('PATCH /api/tasks/[taskId]', () => {
  beforeEach(() => {
    vi.clearAllMocks()

    getSessionMock.mockResolvedValue({
      user: {
        id: 'user-1',
      },
    })
  })

  test('возвращает 401 без авторизации', async () => {
    getSessionMock.mockResolvedValue(null)

    const response = await PATCH(createPatchRequest(), createContext())
    const body = await response.json()

    expect(response.status).toBe(401)
    expect(body).toEqual({ error: 'Unauthorized' })
    expect(findFirstMock).not.toHaveBeenCalled()
    expect(updateMock).not.toHaveBeenCalled()
  })

  test('возвращает 400 для некорректного JSON', async () => {
    const response = await PATCH(createPatchRequest('{'), createContext())
    const body = await response.json()

    expect(response.status).toBe(400)
    expect(body).toEqual({ error: 'Invalid JSON' })
    expect(findFirstMock).not.toHaveBeenCalled()
    expect(updateMock).not.toHaveBeenCalled()
  })

  test('возвращает 400 для невалидных данных', async () => {
    const response = await PATCH(
      createPatchRequest(
        JSON.stringify({
          ...validInput,
          title: '',
        }),
      ),
      createContext(),
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
    expect(updateMock).not.toHaveBeenCalled()
  })

  test('возвращает 404 для недоступной задачи', async () => {
    findFirstMock.mockResolvedValue(null)

    const response = await PATCH(createPatchRequest(), createContext())
    const body = await response.json()

    expect(response.status).toBe(404)
    expect(body).toEqual({ error: 'Task not found' })
    expect(findFirstMock).toHaveBeenCalledWith({
      where: {
        id: 'task-1',
        space: {
          ownerId: 'user-1',
        },
      },
      select: {
        id: true,
      },
    })
    expect(updateMock).not.toHaveBeenCalled()
  })

  test('обновляет и возвращает задачу', async () => {
    findFirstMock.mockResolvedValue({
      id: 'task-1',
    })

    updateMock.mockResolvedValue({
      assignee: 'Иван',
      commentsCount: 0,
      deadline: new Date('2026-08-30T00:00:00.000Z'),
      id: 'task-1',
      priority: 'HIGH',
      progress: 0,
      space: {
        id: 'space-1',
        title: 'Обучение',
      },
      status: 'IN_PROGRESS',
      tag: 'Backend',
      title: 'Сделать макет',
    })

    const response = await PATCH(createPatchRequest(), createContext())
    const body = await response.json()

    expect(response.status).toBe(200)
    expect(body).toEqual({
      task: {
        assignee: 'Иван',
        comments: 0,
        coverTone: 'warning',
        deadline: '2026-08-30',
        id: 'task-1',
        priority: 'high',
        progress: 0,
        space: 'Обучение',
        status: 'in-progress',
        tag: 'Backend',
        title: 'Сделать макет',
      },
    })

    expect(updateMock).toHaveBeenCalledWith({
      where: {
        id: 'task-1',
      },
      data: {
        title: 'Сделать макет',
        deadline: new Date('2026-08-30T00:00:00.000Z'),
        status: 'IN_PROGRESS',
        priority: 'HIGH',
        tag: 'Backend',
        assignee: 'Иван',
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

  test('возвращает 500 при ошибке базы данных', async () => {
    findFirstMock.mockRejectedValue(new Error('Database error'))

    const response = await PATCH(createPatchRequest(), createContext())
    const body = await response.json()

    expect(response.status).toBe(500)
    expect(body).toEqual({ error: 'Internal server error' })
    expect(updateMock).not.toHaveBeenCalled()
  })
})

const createDeleteRequest = () =>
  new Request('http://localhost/api/tasks/task-1', {
    method: 'DELETE',
  })

describe('DELETE /api/tasks/[taskId]', () => {
  beforeEach(() => {
    vi.clearAllMocks()

    getSessionMock.mockResolvedValue({
      user: {
        id: 'user-1',
      },
    })
  })

  test('возвращает 401 без авторизации', async () => {
    getSessionMock.mockResolvedValue(null)

    const response = await DELETE(createDeleteRequest(), createContext())
    const body = await response.json()

    expect(response.status).toBe(401)
    expect(body).toEqual({ error: 'Unauthorized' })
    expect(findFirstMock).not.toHaveBeenCalled()
    expect(deleteManyMock).not.toHaveBeenCalled()
  })

  test('возвращает 404 для отсутствующей или чужой задачи', async () => {
    deleteManyMock.mockResolvedValue({ count: 0 })

    const response = await DELETE(createDeleteRequest(), createContext())
    const body = await response.json()

    expect(response.status).toBe(404)
    expect(body).toEqual({ error: 'Task not found' })
    expect(deleteManyMock).toHaveBeenCalledWith({
      where: {
        id: 'task-1',
        space: {
          ownerId: 'user-1',
        },
      },
    })
  })

  test('успешно удаляет задачу', async () => {
    deleteManyMock.mockResolvedValue({
      count: 1,
    })

    const response = await DELETE(createDeleteRequest(), createContext())

    expect(response.status).toBe(204)
    expect(await response.text()).toBe('')
    expect(deleteManyMock).toHaveBeenCalledWith({
      where: {
        id: 'task-1',
        space: {
          ownerId: 'user-1',
        },
      },
    })
  })

  test('возвращает 500 при ошибке базы данных', async () => {
    deleteManyMock.mockRejectedValue(new Error('Database error'))

    const response = await DELETE(createDeleteRequest(), createContext())
    const body = await response.json()

    expect(response.status).toBe(500)
    expect(body).toEqual({ error: 'Internal server error' })
    expect(deleteManyMock).toHaveBeenCalledOnce()
  })
})
