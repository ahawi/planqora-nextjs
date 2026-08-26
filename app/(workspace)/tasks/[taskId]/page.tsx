import { notFound } from 'next/navigation'

import { getTaskById } from '@/src/entities/task/index.server'
import { requireSession } from '@/src/shared/lib/index.server'
import { TaskDetails } from '@/src/widgets/task-details'

interface TaskDetailsPageProps {
  params: Promise<{ taskId: string }>
}

const TaskDetailsPage = async ({ params }: TaskDetailsPageProps) => {
  const { taskId } = await params
  const session = await requireSession()

  const task = await getTaskById({ taskId, ownerId: session.user.id })

  if (!task) notFound()

  return <TaskDetails task={task} />
}

export default TaskDetailsPage
