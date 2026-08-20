import { FolderArrowDownIcon, PaperClipIcon } from '@heroicons/react/24/outline'

import { priorityLabels, statusLabels, type Task } from '@/src/entities/task'
import { formatDeadline } from '@/src/shared/lib'
import { Button, Card, Progress } from '@/src/shared/ui'

export const TaskProperties = ({ task }: { task: Task }) => {
  const properties = [
    ['Исполнитель', task.assignee],
    ['Пространство', task.space],
    ['Статус', statusLabels[task.status]],
    ['Срок', formatDeadline(task.deadline)],
    ['Приоритет', priorityLabels[task.priority]],
  ]

  return (
    <Card className="border-0 p-6 min-[1101px]:sticky min-[1101px]:top-5">
      <p className="text-xs font-bold uppercase tracking-[0.08em] text-secondary-300">
        Назначенная задача
      </p>
      <h2 className="mt-6 text-2xl font-bold leading-tight">{task.title}</h2>
      <p className="mt-2 text-sm text-secondary-400">{task.space}</p>

      <section className="mt-8">
        <h3 className="text-lg font-bold">Свойства</h3>
        <dl className="mt-5 grid gap-5">
          {properties.map(([label, value]) => (
            <div
              className="flex items-center justify-between gap-4 text-sm"
              key={label}
            >
              <dt className="text-secondary-400">{label}</dt>
              <dd className="text-right font-semibold text-secondary-500">
                {value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-8">
        <div className="flex items-center justify-between text-sm font-bold">
          <span>Прогресс</span>
          <span className="text-primary-500">{task.progress}%</span>
        </div>
        <Progress className="mt-3" value={task.progress} />
      </section>

      <section className="mt-8 border-t border-border pt-7">
        <h3 className="text-lg font-bold">Файлы задачи</h3>
        <p className="mt-2 text-xs text-secondary-400">
          Последнее изменение: сегодня, 12:30
        </p>
        <div className="mt-5 grid min-h-44 place-items-center rounded-xl border-2 border-dashed border-primary-300 bg-primary-100/30 p-5 text-center">
          <div>
            <FolderArrowDownIcon className="mx-auto size-10 text-primary-400" />
            <p className="mt-3 text-sm font-semibold">Перетащите файл сюда</p>
            <p className="mt-1 text-xs text-secondary-400">
              или выберите на устройстве
            </p>
          </div>
        </div>
        <Button className="mt-4 w-full" variant="secondary">
          <PaperClipIcon />
          Добавить файл
        </Button>
      </section>

      <div className="mt-8 grid gap-3">
        <Button className="w-full" size="lg">
          Сохранить изменения
        </Button>
        <Button className="w-full" size="lg" variant="minimal">
          Отметить выполненной
        </Button>
      </div>
    </Card>
  )
}
