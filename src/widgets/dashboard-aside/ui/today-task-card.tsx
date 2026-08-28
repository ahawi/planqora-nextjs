import { ClockIcon, EllipsisHorizontalIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

import { getTaskDueLabel, useGetTasksQuery } from '@/src/entities/task'
import { AvatarGroup, Button, Card, Progress, Skeleton } from '@/src/shared/ui'

interface TodayTaskCardProps {
  deadline: string
}

export const TodayTaskCard = ({ deadline }: TodayTaskCardProps) => {
  const { data: tasks = [], error, isLoading } = useGetTasksQuery({ deadline })
  const task = tasks[0]

  if (isLoading) {
    return (
      <Card
        aria-label="Загрузка задач на выбранную дату"
        className="mt-6 border-0 p-[25px] max-[1180px]:mt-0"
        role="status"
      >
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-36" />
          <Skeleton className="size-8" />
        </div>
        <Skeleton className="mt-5 min-h-[150px] rounded-[14px] bg-primary-100" />
        <div className="mt-5 flex justify-between">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-8" />
        </div>
        <Skeleton className="mt-2.5 h-2 w-full" />
        <div className="mt-[18px] flex justify-between">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-6 w-20" />
        </div>
        <Skeleton className="mt-6 h-12 rounded-xl bg-primary-500" />
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="mt-6 grid min-h-[280px] place-items-center border-0 p-[25px] max-[1180px]:mt-0">
        <p
          className="rounded-xl border border-error-400 bg-error-100 px-4 py-3 text-center text-sm font-medium text-error-600"
          role="alert"
        >
          Не удалось загрузить задачи на выбранную дату
        </p>
      </Card>
    )
  }

  if (!task) {
    return (
      <Card className="mt-6 grid min-h-[280px] place-items-center border-0 p-[25px] text-center max-[1180px]:mt-0">
        <div role="status">
          <h2 className="text-base font-semibold text-secondary-500">
            На выбранную дату задач нет
          </h2>
          <p className="mt-2 text-sm text-secondary-300">
            Выберите другой день в календаре
          </p>
        </div>
      </Card>
    )
  }

  return (
    <Card className="mt-6 border-0 p-[25px] max-[1180px]:mt-0">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold">Задача на выбранную дату</h2>
        <Button aria-label="Меню задачи" iconOnly size="sm" variant="minimal">
          <EllipsisHorizontalIcon />
        </Button>
      </div>
      <div className="mt-5 grid min-h-[clamp(160px,55vw,230px)] content-end overflow-hidden rounded-[14px] bg-gradient-to-br from-primary-800 to-error-400 p-5 text-primary-0 min-[861px]:min-h-[150px]">
        <span className="text-[11px] opacity-80">{task.space}</span>
        <strong className="mt-1 text-base">{task.title}</strong>
      </div>
      <div className="mt-5 flex justify-between text-[13px] font-bold">
        <span>Прогресс</span>
        <span className="text-primary-500">{task.progress}%</span>
      </div>
      <Progress className="mt-2.5" value={task.progress} />
      <div className="mt-[18px] flex items-center justify-between text-xs font-bold text-secondary-400">
        <span className="flex items-center gap-1">
          <ClockIcon className="size-4" />
          {getTaskDueLabel(task)}
        </span>
        <AvatarGroup />
      </div>
      <Button asChild className="mt-6 w-full" size="lg">
        <Link href={`/tasks/${task.id}`}>Открыть задачу</Link>
      </Button>
    </Card>
  )
}
