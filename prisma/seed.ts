import 'dotenv/config'

import { TaskPriority, TaskStatus } from '@/src/generated/prisma/enums'
import { prisma } from '@/src/shared/lib/server/prisma'

const createUtcDate = (dayOffset: number) => {
  const now = new Date()

  return new Date(
    Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate() + dayOffset,
      12,
    ),
  )
}

const daysAgo = (days: number) => createUtcDate(-days)
const daysFromNow = (days: number) => createUtcDate(days)

const main = async () => {
  const owner = await prisma.user.findUnique({
    where: {
      email: 'ivan@ivan.ru',
    },
  })

  if (!owner) {
    throw new Error('Пользователь не найден')
  }

  const spaces = [
    {
      id: 'space-web-redesign',
      title: 'Редизайн сайта',
      description: 'Дизайн и разработка',
    },
    {
      id: 'space-mobile-app',
      title: 'Мобильное приложение',
      description: 'Продуктовая команда',
    },
    {
      id: 'space-marketing',
      title: 'Маркетинг',
      description: 'Контент и продвижение',
    },
  ]

  await Promise.all(
    spaces.map((space) =>
      prisma.space.upsert({
        where: {
          id: space.id,
        },
        update: {
          title: space.title,
          description: space.description,
          ownerId: owner.id,
        },
        create: {
          ...space,
          ownerId: owner.id,
        },
      }),
    ),
  )

  const tasks = [
    {
      id: 'ui-kit',
      title: 'Собрать UI-kit проекта',
      deadline: daysFromNow(3),
      status: TaskStatus.TODO,
      priority: TaskPriority.HIGH,
      tag: 'Дизайн',
      assignee: 'Иван',
      progress: 75,
      commentsCount: 3,
      createdAt: daysAgo(6),
      completedAt: null,
      spaceId: 'space-web-redesign',
    },
    {
      id: 'adaptive-layout',
      title: 'Сверстать адаптив главной',
      deadline: daysFromNow(2),
      status: TaskStatus.IN_PROGRESS,
      priority: TaskPriority.MEDIUM,
      tag: 'Вёрстка',
      assignee: 'Иван',
      progress: 45,
      commentsCount: 2,
      createdAt: daysAgo(5),
      completedAt: null,
      spaceId: 'space-web-redesign',
    },
    {
      id: 'site-audit',
      title: 'Провести аудит сайта',
      deadline: daysAgo(5),
      status: TaskStatus.DONE,
      priority: TaskPriority.LOW,
      tag: 'Исследование',
      assignee: 'Иван',
      progress: 100,
      commentsCount: 2,
      createdAt: daysAgo(6),
      completedAt: daysAgo(5),
      spaceId: 'space-web-redesign',
    },
    {
      id: 'design-concept',
      title: 'Утвердить концепцию дизайна',
      deadline: daysAgo(4),
      status: TaskStatus.DONE,
      priority: TaskPriority.MEDIUM,
      tag: 'Дизайн',
      assignee: 'Иван',
      progress: 100,
      commentsCount: 4,
      createdAt: daysAgo(6),
      completedAt: daysAgo(4),
      spaceId: 'space-web-redesign',
    },
    {
      id: 'auth',
      title: 'Настроить авторизацию',
      deadline: daysFromNow(5),
      status: TaskStatus.BACKLOG,
      priority: TaskPriority.HIGH,
      tag: 'Разработка',
      assignee: 'Иван',
      progress: 15,
      commentsCount: 5,
      createdAt: daysAgo(4),
      completedAt: null,
      spaceId: 'space-mobile-app',
    },
    {
      id: 'mobile-flow',
      title: 'Продумать сценарии приложения',
      deadline: daysFromNow(4),
      status: TaskStatus.TODO,
      priority: TaskPriority.MEDIUM,
      tag: 'UX',
      assignee: 'Иван',
      progress: 60,
      commentsCount: 4,
      createdAt: daysAgo(3),
      completedAt: null,
      spaceId: 'space-mobile-app',
    },
    {
      id: 'api-integration',
      title: 'Подключить API приложения',
      deadline: daysFromNow(6),
      status: TaskStatus.IN_PROGRESS,
      priority: TaskPriority.HIGH,
      tag: 'Разработка',
      assignee: 'Иван',
      progress: 35,
      commentsCount: 3,
      createdAt: daysAgo(2),
      completedAt: null,
      spaceId: 'space-mobile-app',
    },
    {
      id: 'user-research',
      title: 'Провести интервью с пользователями',
      deadline: daysAgo(3),
      status: TaskStatus.DONE,
      priority: TaskPriority.MEDIUM,
      tag: 'Исследование',
      assignee: 'Иван',
      progress: 100,
      commentsCount: 6,
      createdAt: daysAgo(4),
      completedAt: daysAgo(3),
      spaceId: 'space-mobile-app',
    },
    {
      id: 'wireframes',
      title: 'Подготовить прототипы экранов',
      deadline: daysAgo(2),
      status: TaskStatus.DONE,
      priority: TaskPriority.MEDIUM,
      tag: 'UX',
      assignee: 'Иван',
      progress: 100,
      commentsCount: 3,
      createdAt: daysAgo(2),
      completedAt: daysAgo(2),
      spaceId: 'space-mobile-app',
    },
    {
      id: 'campaign',
      title: 'Подготовить рекламную кампанию',
      deadline: daysFromNow(7),
      status: TaskStatus.TODO,
      priority: TaskPriority.MEDIUM,
      tag: 'Исследование',
      assignee: 'Иван',
      progress: 20,
      commentsCount: 1,
      createdAt: daysAgo(1),
      completedAt: null,
      spaceId: 'space-marketing',
    },
    {
      id: 'newsletter',
      title: 'Сверстать email-рассылку',
      deadline: daysFromNow(8),
      status: TaskStatus.BACKLOG,
      priority: TaskPriority.LOW,
      tag: 'Вёрстка',
      assignee: 'Иван',
      progress: 0,
      commentsCount: 0,
      createdAt: daysAgo(0),
      completedAt: null,
      spaceId: 'space-marketing',
    },
    {
      id: 'content-plan',
      title: 'Составить контент-план',
      deadline: daysAgo(1),
      status: TaskStatus.DONE,
      priority: TaskPriority.LOW,
      tag: 'Исследование',
      assignee: 'Иван',
      progress: 100,
      commentsCount: 2,
      createdAt: daysAgo(2),
      completedAt: daysAgo(1),
      spaceId: 'space-marketing',
    },
    {
      id: 'marketing-report',
      title: 'Подготовить отчёт по кампании',
      deadline: daysAgo(0),
      status: TaskStatus.DONE,
      priority: TaskPriority.MEDIUM,
      tag: 'Разработка',
      assignee: 'Иван',
      progress: 100,
      commentsCount: 2,
      createdAt: daysAgo(1),
      completedAt: daysAgo(0),
      spaceId: 'space-marketing',
    },
  ]

  await Promise.all(
    tasks.map(({ id, ...data }) =>
      prisma.task.upsert({
        where: {
          id,
        },
        update: data,
        create: {
          id,
          ...data,
        },
      }),
    ),
  )
}

void main()
  .catch((error: unknown) => {
    console.error(error)
    process.exitCode = 1
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
