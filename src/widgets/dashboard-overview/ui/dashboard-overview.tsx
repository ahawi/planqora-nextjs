import { ActivityCard } from './activity-card'
import { RunningTasksCard } from './running-tasks-card'

export function DashboardOverview() {
  return (
    <section className="mb-10 grid grid-cols-[220px_minmax(0,1fr)] gap-6 [@media(max-height:950px)]:mb-5 max-[860px]:mb-[34px] max-[860px]:grid-cols-1 max-[860px]:gap-[30px]">
      <RunningTasksCard />
      <ActivityCard />
    </section>
  )
}
