import { delay, ROUTE_SKELETON_DELAY } from '@/src/shared/lib'
import { requireSession } from '@/src/shared/lib/index.server'
import { DashboardHeader } from '@/src/widgets/dashboard-header'
import { TaskExplorer } from '@/src/widgets/task-explorer'

export const dynamic = 'force-dynamic'

const TasksPage = async () => {
  const session = await requireSession()

  await delay(ROUTE_SKELETON_DELAY)

  return (
    <TaskExplorer
      header={
        <DashboardHeader
          subtitle="Найдите нужную задачу или отфильтруйте список"
          title="Мои задачи"
          userName={session.user.name}
        />
      }
    />
  )
}

export default TasksPage
