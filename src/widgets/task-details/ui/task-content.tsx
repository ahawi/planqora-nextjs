import {
  CheckIcon,
  ClockIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline'

import { getTaskDueLabel, priorityLabels, type Task } from '@/src/entities/task'
import { AvatarGroup, Card, Progress } from '@/src/shared/ui'

import { TaskPreview } from './task-preview'

const checklist = [
  'Собрать референсы и определить визуальное направление',
  'Подготовить структуру и основные компоненты страницы',
  'Сверстать desktop и mobile версии',
  'Проверить доступность и состояния интерфейса',
]

export const TaskContent = ({ task }: { task: Task }) => {
  return (
    <Card className="border-0 p-5 min-[700px]:p-7">
      <TaskPreview />
      <div className="px-1 pb-2 pt-7">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-[clamp(25px,3vw,36px)] font-bold tracking-[-0.04em]">
              {task.title}
            </h2>
            <p className="mt-2 text-sm text-secondary-400">{task.space}</p>
          </div>
          <span className="rounded-lg bg-warning-100 px-3 py-1.5 text-xs font-bold text-warning-800">
            {priorityLabels[task.priority]}
          </span>
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-6 text-sm text-secondary-400">
          <span className="flex items-center gap-2">
            <UserGroupIcon className="size-5" />3 участника
          </span>
          <span className="flex items-center gap-2">
            <ClockIcon className="size-5" />
            {getTaskDueLabel(task)}
          </span>
          <AvatarGroup />
        </div>

        <section className="mt-9">
          <h3 className="text-xl font-bold">Описание</h3>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-secondary-400">
            Собрать адаптивную главную страницу рабочего пространства по
            утверждённому макету. Использовать компоненты из UI-kit, сохранить
            визуальную иерархию, предусмотреть состояния загрузки и корректное
            отображение на мобильных устройствах.{' '}
          </p>
        </section>

        <section className="mt-9">
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-xl font-bold">Чек-лист</h3>
            <span className="text-xs font-semibold text-secondary-400">
              3 из 4 выполнено
            </span>
          </div>
          <Progress className="mt-3" value={75} />
          <ul className="mt-5 grid gap-4">
            {checklist.map((item, index) => (
              <li
                className="flex items-start gap-3 text-sm text-secondary-400"
                key={item}
              >
                <span
                  className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full ${index < 3 ? 'bg-primary-500 text-primary-0' : 'border-2 border-secondary-200'}`}
                >
                  {index < 3 && <CheckIcon className="size-3.5" />}
                </span>
                <span className={index < 3 ? 'line-through opacity-70' : ''}>
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </Card>
  )
}
