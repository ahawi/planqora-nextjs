import { delay, ROUTE_SKELETON_DELAY } from '@/src/shared/lib'
import { KanbanBoard } from '@/src/widgets/kanban-board'

export const dynamic = 'force-dynamic'

export default async function SpacePage() {
  await delay(ROUTE_SKELETON_DELAY)

  return <KanbanBoard />
}
