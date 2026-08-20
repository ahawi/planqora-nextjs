import { delay, ROUTE_SKELETON_DELAY } from '@/src/shared/lib'
import { DashboardAside } from '@/src/widgets/dashboard-aside'
import { DashboardHeader } from '@/src/widgets/dashboard-header'
import { DashboardLayout } from '@/src/widgets/dashboard-layout'
import { DashboardOverview } from '@/src/widgets/dashboard-overview'
import { SpacesSection } from '@/src/widgets/spaces-section'
import { UpcomingTasks } from '@/src/widgets/upcoming-tasks'

export const dynamic = 'force-dynamic'

const Page = async () => {
  await delay(ROUTE_SKELETON_DELAY)

  return (
    <DashboardLayout aside={<DashboardAside />}>
      <DashboardHeader />
      <DashboardOverview />
      <SpacesSection />
      <UpcomingTasks />
    </DashboardLayout>
  )
}

export default Page
