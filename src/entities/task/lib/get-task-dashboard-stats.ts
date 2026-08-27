import { TaskStatus } from '@/src/generated/prisma/enums'

interface DashboardTaskDTO {
  status: TaskStatus
  createdAt: Date
  completedAt: Date | null
}

export interface TaskActivityDay {
  date: string
  label: string
  created: number
  completed: number
}

export interface TaskDashboardStats {
  totalTasks: number
  activeTasks: number
  activePercent: number
  activity: TaskActivityDay[]
}

const DAY_LABELS = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']

const getDateKey = (date: Date) => date.toISOString().slice(0, 10)

export const getTaskDashboardStats = (
  tasks: DashboardTaskDTO[],
  today = new Date(),
): TaskDashboardStats => {
  const activity = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(today)

    date.setUTCHours(0, 0, 0, 0)
    date.setUTCDate(date.getUTCDate() - 6 + index)

    const dateKey = getDateKey(date)

    const created = tasks.filter(
      (task) => getDateKey(task.createdAt) === dateKey,
    ).length

    const completed = tasks.filter(
      (task) => task.completedAt && getDateKey(task.completedAt) === dateKey,
    ).length

    return {
      date: dateKey,
      label: DAY_LABELS[date.getUTCDay()],
      created,
      completed,
    }
  })

  const totalTasks = tasks.length

  const activeTasks = tasks.filter(
    (task) => task.status !== TaskStatus.DONE,
  ).length

  const activePercent =
    totalTasks === 0 ? 0 : Math.round((activeTasks / totalTasks) * 100)

  return {
    totalTasks,
    activeTasks,
    activePercent,
    activity,
  }
}
