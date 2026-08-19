import { notFound } from 'next/navigation'

import { tasksMock } from '@/src/entities/task'
import { TaskDetails } from '@/src/widgets/task-details'

interface TaskDetailsPageProps {
  params: Promise<{ taskId: string }>
}

export default async function TaskDetailsPage({
  params,
}: TaskDetailsPageProps) {
  const { taskId } = await params

  const task = tasksMock.find((task) => task.id === taskId)

  if (!task) notFound()

  return <TaskDetails task={task} />
}
