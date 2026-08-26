'use client'

import { TaskCard, useGetTasksQuery } from '@/src/entities/task'
import { sortTasks } from '@/src/features/task-filters'
import { SectionHeading } from '@/src/shared/ui'

export const UpcomingTasks = () => {
  const { data: tasks = [], isLoading, error } = useGetTasksQuery()
  const unfinishedTasks = tasks.filter((task) => task.status !== 'done')
  const upcomingTasks = sortTasks(unfinishedTasks, 'deadline-asc').slice(0, 2)

  if (isLoading) {
    return (
      <section
        className="mt-[38px] [@media(max-height:950px)]:mt-5 max-[860px]:mt-[34px]"
        role="status"
      >
        <p className="text-sm text-secondary-400">
          Загрузка ближайших задач...
        </p>
      </section>
    )
  }

  if (error) {
    return (
      <section className="mt-[38px] [@media(max-height:950px)]:mt-5 max-[860px]:mt-[34px]">
        <p
          className="rounded-xl border border-error-400 bg-error-100 px-4 py-3 text-sm font-medium text-error-600"
          role="alert"
        >
          Не удалось загрузить ближайшие задачи
        </p>
      </section>
    )
  }

  if (upcomingTasks.length === 0) {
    return null
  }

  return (
    <section className="mt-[38px] [@media(max-height:950px)]:mt-5 max-[860px]:mt-[34px]">
      <SectionHeading actionLabel="Смотреть все" title="Ближайшие задачи" />
      <div className="grid grid-cols-2 gap-[18px] max-[860px]:-mr-[clamp(20px,7vw,32px)] max-[860px]:auto-cols-[minmax(270px,94%)] max-[860px]:grid-flow-col max-[860px]:grid-cols-none max-[860px]:snap-x max-[860px]:snap-mandatory max-[860px]:overflow-x-auto max-[860px]:pr-[clamp(20px,7vw,32px)] max-[860px]:[scrollbar-width:none] max-[860px]:[&::-webkit-scrollbar]:hidden">
        {upcomingTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </section>
  )
}
