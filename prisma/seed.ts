import 'dotenv/config'

import { TaskPriority, TaskStatus } from '@/src/generated/prisma/enums'
import { prisma } from '@/src/shared/lib/server/prisma'

const main = async () => {
  const space = await prisma.space.upsert({
    where: {
      id: 'space-web-redesign',
    },
    update: {
      title: 'Редизайн сайта',
      description: 'Дизайн и разработка',
    },
    create: {
      id: 'space-web-redesign',
      title: 'Редизайн сайта',
      description: 'Дизайн и разработка',
    },
  })

  const taskData = {
    title: 'Собрать UI-kit проекта',
    deadline: new Date('2026-08-18T00:00:00.000Z'),
    status: TaskStatus.TODO,
    priority: TaskPriority.HIGH,
    tag: 'Дизайн',
    progress: 75,
    commentsCount: 3,
    spaceId: space.id,
  }

  const task = await prisma.task.upsert({
    where: {
      id: 'ui-kit',
    },
    update: taskData,
    create: {
      id: 'ui-kit',
      ...taskData,
    },
  })

  console.log(`Seeded space: ${space.title}`)
  console.log(`Seeded task: ${task.title}`)
}

void main()
  .catch((error: unknown) => {
    console.error(error)
    process.exitCode = 1
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
