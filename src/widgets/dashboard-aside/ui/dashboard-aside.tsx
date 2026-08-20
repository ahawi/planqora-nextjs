import { TodayTaskCard } from './today-task-card'
import { WeekCalendar } from './week-calendar'

export const DashboardAside = () => {
  return (
    <aside className="min-w-0 overflow-hidden bg-surface-muted px-7 py-[38px] max-[1180px]:grid max-[1180px]:grid-cols-[1fr_1.3fr] max-[1180px]:gap-5 max-[1180px]:bg-primary-0 max-[1180px]:pt-0 max-[860px]:grid-cols-1 max-[860px]:gap-7 max-[860px]:bg-surface-subtle max-[860px]:px-[clamp(20px,7vw,32px)] max-[860px]:py-6">
      <WeekCalendar />
      <TodayTaskCard />
    </aside>
  )
}
