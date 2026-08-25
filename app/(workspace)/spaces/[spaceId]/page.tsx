import { delay, ROUTE_SKELETON_DELAY } from '@/src/shared/lib'
import { KanbanBoard } from '@/src/widgets/kanban-board'

export const dynamic = 'force-dynamic'

interface SpacePageProps {
  params: Promise<{ spaceId: string }>
}

const SpacePage = async ({ params }: SpacePageProps) => {
  const { spaceId } = await params

  await delay(ROUTE_SKELETON_DELAY)

  return <KanbanBoard spaceId={spaceId} />
}

export default SpacePage
