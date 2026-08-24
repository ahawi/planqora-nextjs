import { auth } from '@/src/shared/lib/server/auth'
import { prisma } from '@/src/shared/lib/server/prisma'

export const GET = async (request: Request) => {
  try {
    const session = await auth.api.getSession({ headers: request.headers })
    if (!session) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const tasks = await prisma.task.findMany({
      where: {
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

    return Response.json({ tasks })
  } catch {
    return Response.json(
      {
        error: 'Internal server error',
      },
      { status: 500 },
    )
  }
}
