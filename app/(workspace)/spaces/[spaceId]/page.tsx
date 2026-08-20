import { delay, ROUTE_SKELETON_DELAY } from '@/src/shared/lib'
import { KanbanBoard } from '@/src/widgets/kanban-board'

export const dynamic = 'force-dynamic'

const SpacePage = async () => {
  await delay(ROUTE_SKELETON_DELAY)

  return <KanbanBoard />
}

export default SpacePage
