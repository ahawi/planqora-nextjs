import { delay, ROUTE_SKELETON_DELAY } from '@/src/shared/lib'
import { TaskExplorer } from '@/src/widgets/task-explorer'

export const dynamic = 'force-dynamic'

const TasksPage = async () => {
  await delay(ROUTE_SKELETON_DELAY)

  return <TaskExplorer />
}

export default TasksPage
