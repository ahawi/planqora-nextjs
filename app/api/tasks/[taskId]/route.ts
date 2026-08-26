import {
  mapTaskDTO,
  mapTaskPriorityToPrisma,
  mapTaskStatusToPrisma,
} from '@/src/entities/task'
import { editTaskRequestSchema } from '@/src/features/edit-task'
import { auth } from '@/src/shared/lib/server/auth'
import { prisma } from '@/src/shared/lib/server/prisma'

interface TaskRouteContext {
  params: Promise<{ taskId: string }>
}

export const PATCH = async (request: Request, context: TaskRouteContext) => {
  try {
    const session = await auth.api.getSession({ headers: request.headers })

    if (!session) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { taskId } = await context.params

    let body: unknown
    try {
      body = await request.json()
    } catch {
      return Response.json({ error: 'Invalid JSON' }, { status: 400 })
    }

    const result = editTaskRequestSchema.safeParse(body)

    if (!result.success) {
      return Response.json({ errors: result.error.issues }, { status: 400 })
    }

    const task = await prisma.task.findFirst({
      where: {
        id: taskId,
        space: {
          ownerId: session.user.id,
        },
      },
      select: {
        id: true,
      },
    })

    if (!task) {
      return Response.json({ error: 'Task not found' }, { status: 404 })
    }

    const updatedTask = await prisma.task.update({
      where: {
        id: task.id,
      },
      data: {
        title: result.data.title,
        deadline: new Date(`${result.data.deadline}T00:00:00.000Z`),
        status: mapTaskStatusToPrisma(result.data.status),
        priority: mapTaskPriorityToPrisma(result.data.priority),
        tag: result.data.tag,
        assignee: result.data.assignee,
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

    const mappedTask = mapTaskDTO(updatedTask)

    return Response.json({ task: mappedTask })
  } catch {
    return Response.json(
      {
        error: 'Internal server error',
      },
      { status: 500 },
    )
  }
}

export const DELETE = async (request: Request, context: TaskRouteContext) => {
  try {
    const session = await auth.api.getSession({ headers: request.headers })

    if (!session) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { taskId } = await context.params

    const result = await prisma.task.deleteMany({
      where: {
        id: taskId,
        space: {
          ownerId: session.user.id,
        },
      },
    })

    if (result.count === 0) {
      return Response.json({ error: 'Task not found' }, { status: 404 })
    }

    return new Response(null, { status: 204 })
  } catch {
    return Response.json(
      {
        error: 'Internal server error',
      },
      {
        status: 500,
      },
    )
  }
}
