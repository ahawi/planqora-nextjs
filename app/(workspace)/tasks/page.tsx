import { delay, ROUTE_SKELETON_DELAY } from '@/src/shared/lib'
import { TaskExplorer } from '@/src/widgets/task-explorer'

export const dynamic = 'force-dynamic'

export default async function TasksPage() {
  await delay(ROUTE_SKELETON_DELAY)

  return <TaskExplorer />
}
