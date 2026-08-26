import 'server-only'

import { prisma } from '@/src/shared/lib/server/prisma'

import { mapTaskDTO } from '../lib/map-task'
import type { Task } from '../model/types'

interface GetTaskByIdArgs {
  taskId: string
  ownerId: string
}

export const getTaskById = async ({
  taskId,
  ownerId,
}: GetTaskByIdArgs): Promise<Task | null> => {
  const task = await prisma.task.findFirst({
    where: {
      id: taskId,
      space: {
        ownerId,
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
  })

  if (!task) {
    return null
  }

  return mapTaskDTO(task)
}
