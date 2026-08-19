import { TaskCard, upcomingTasksMock } from '@/src/entities/task'
import { SectionHeading } from '@/src/shared/ui'

export function UpcomingTasks() {
  return (
    <section className="mt-[38px] [@media(max-height:950px)]:mt-5 max-[860px]:mt-[34px]">
      <SectionHeading actionLabel="Смотреть все" title="Ближайшие задачи" />
      <div className="grid grid-cols-2 gap-[18px] max-[860px]:-mr-[clamp(20px,7vw,32px)] max-[860px]:auto-cols-[minmax(270px,94%)] max-[860px]:grid-flow-col max-[860px]:grid-cols-none max-[860px]:snap-x max-[860px]:snap-mandatory max-[860px]:overflow-x-auto max-[860px]:pr-[clamp(20px,7vw,32px)] max-[860px]:[scrollbar-width:none] max-[860px]:[&::-webkit-scrollbar]:hidden">
        {upcomingTasksMock.map((task) => (
          <TaskCard key={task.title} task={task} />
        ))}
      </div>
    </section>
  )
}
