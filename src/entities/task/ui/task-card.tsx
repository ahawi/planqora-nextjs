import Link from 'next/link'

import {
  AvatarGroup,
  Card,
  CardContent,
  CardFooter,
  Progress,
} from '@/src/shared/ui'

import { getTaskDueLabel } from '../lib/get-task-due-label'
import type { Task } from '../model/types'
import { TaskCover } from './task-cover'

export const TaskCard = ({ task }: { task: Task }) => {
  return (
    <Card className="snap-start p-3.5 transition [@media(max-height:950px)]:p-2.5 hover:-translate-y-0.5 hover:shadow-lg">
      <TaskCover tone={task.coverTone} />
      <CardContent>
        <h3 className="mx-0.5 mb-1 mt-4 text-[15px] font-bold [@media(max-height:950px)]:mt-2">
          <Link className="hover:text-primary-600" href={`/tasks/${task.id}`}>
            {task.title}
          </Link>
        </h3>
        <p className="mx-0.5 text-xs text-secondary-400">{task.space}</p>
        <div className="mx-0.5 mt-[18px] flex justify-between text-xs font-bold [@media(max-height:950px)]:mt-2">
          <span>Прогресс</span>
          <span className="text-primary-500">{task.progress}%</span>
        </div>
        <Progress className="mt-2.5" value={task.progress} />
      </CardContent>
      <CardFooter className="mx-0.5 mt-4 text-xs font-bold text-secondary-400 [@media(max-height:950px)]:mt-2">
        <span>◷&nbsp; {getTaskDueLabel(task)}</span>
        <AvatarGroup />
      </CardFooter>
    </Card>
  )
}
