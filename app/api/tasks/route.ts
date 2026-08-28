import {
  getTasksQuerySchema,
  mapTaskDTO,
  mapTaskPriorityToPrisma,
  mapTaskStatusToPrisma,
} from '@/src/entities/task'
import { createTaskRequestSchema } from '@/src/features/create-task'
import { auth } from '@/src/shared/lib/server/auth'
import { prisma } from '@/src/shared/lib/server/prisma'

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url)

  try {
    const session = await auth.api.getSession({ headers: request.headers })

    if (!session) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const queryResult = getTasksQuerySchema.safeParse({
      spaceId: searchParams.get('spaceId') ?? undefined,
      deadline: searchParams.get('deadline') ?? undefined,
    })

    if (!queryResult.success) {
      return Response.json(
        {
          errors: queryResult.error.issues,
        },
        { status: 400 },
      )
    }

    const { spaceId, deadline } = queryResult.data

    const tasks = await prisma.task.findMany({
      where: {
        ...(spaceId ? { spaceId } : {}),
        ...(deadline
          ? {
              deadline: new Date(`${deadline}T00:00:00.000Z`),
            }
          : {}),
        space: {
          ownerId: session.user.id,
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

    const mappedTasks = tasks.map(mapTaskDTO)

    return Response.json({ tasks: mappedTasks })
  } catch {
    return Response.json(
      {
        error: 'Internal server error',
      },
      { status: 500 },
    )
  }
}

export const POST = async (request: Request) => {
  try {
    const session = await auth.api.getSession({ headers: request.headers })

    if (!session) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    let body: unknown

    try {
      body = await request.json()
    } catch {
      return Response.json({ error: 'Invalid JSON' }, { status: 400 })
    }

    const result = createTaskRequestSchema.safeParse(body)

    if (!result.success) {
      return Response.json(
        {
          errors: result.error.issues,
        },
        { status: 400 },
      )
    }

    const space = await prisma.space.findFirst({
      where: {
        id: result.data.spaceId,
        ownerId: session.user.id,
      },
      select: {
        id: true,
      },
    })

    if (!space) {
      return Response.json({ error: 'Space not found' }, { status: 404 })
    }

    const task = await prisma.task.create({
      data: {
        title: result.data.title,
        deadline: new Date(`${result.data.deadline}T00:00:00.000Z`),
        status: mapTaskStatusToPrisma(result.data.status),
        priority: mapTaskPriorityToPrisma(result.data.priority),
        tag: result.data.tag,
        assignee: result.data.assignee,
        completedAt: result.data.status === 'done' ? new Date() : null,
        spaceId: space.id,
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

    const mappedTask = mapTaskDTO(task)

    return Response.json({ task: mappedTask }, { status: 201 })
  } catch {
    return Response.json(
      {
        error: 'Internal server error',
      },
      { status: 500 },
    )
  }
}
