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

const coverClasses: Record<Task['coverTone'], string> = {
  primary: 'from-primary-900 via-primary-500 to-warning-300',
  warning: 'from-secondary-500 via-error-400 to-warning-300',
}

function TaskCover({ tone }: { tone: Task['coverTone'] }) {
  return (
    <div
      className={`relative h-[clamp(125px,38vw,170px)] overflow-hidden rounded-[14px] bg-gradient-to-br ${coverClasses[tone]} min-[861px]:h-[116px] [@media(max-height:950px)]:h-20`}
    >
      <span className="absolute left-[22%] top-6 h-[72px] w-[110px] -rotate-[8deg] rounded-[10px] border-[7px] border-primary-0/70 bg-primary-0/15" />
      <span className="absolute right-[13%] top-3 h-[92px] w-[52px] rotate-[8deg] rounded-[10px] border-[7px] border-primary-0/70 bg-primary-0/15" />
    </div>
  )
}

export function TaskCard({ task }: { task: Task }) {
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
