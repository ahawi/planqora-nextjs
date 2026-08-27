import { getTaskDashboardStats } from '@/src/entities/task'
import { auth } from '@/src/shared/lib/server/auth'
import { prisma } from '@/src/shared/lib/server/prisma'

export const GET = async (request: Request) => {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    })

    if (!session) {
      return Response.json(
        {
          error: 'Unauthorized',
        },
        { status: 401 },
      )
    }

    const tasks = await prisma.task.findMany({
      where: {
        space: {
          ownerId: session.user.id,
        },
      },
      select: {
        status: true,
        createdAt: true,
        completedAt: true,
      },
    })

    const stats = getTaskDashboardStats(tasks)

    return Response.json({ stats })
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
