import { mapSpaceDTO } from '@/src/entities/space'
import { auth } from '@/src/shared/lib/server/auth'
import { prisma } from '@/src/shared/lib/server/prisma'

export const GET = async (request: Request) => {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    })

    if (!session) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const spaces = await prisma.space.findMany({
      where: {
        ownerId: session.user.id,
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

    const mappedSpaces = spaces.map(mapSpaceDTO)

    return Response.json({ spaces: mappedSpaces })
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
