import { ClockIcon, EllipsisHorizontalIcon } from '@heroicons/react/24/outline'

import { AvatarGroup, Button, Card, Progress } from '@/src/shared/ui'

const subtasks = [
  'Собрать референсы',
  'Подготовить первый экран',
  'Проверить адаптивность',
]

export function TodayTaskCard() {
  return (
    <Card className="mt-6 border-0 p-[25px] max-[1180px]:mt-0">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold">Задача на сегодня</h2>
        <Button aria-label="Меню задачи" iconOnly size="sm" variant="minimal">
          <EllipsisHorizontalIcon />
        </Button>
      </div>
      <div className="mt-5 grid min-h-[clamp(160px,55vw,230px)] content-end overflow-hidden rounded-[14px] bg-gradient-to-br from-primary-800 to-error-400 p-5 text-primary-0 min-[861px]:min-h-[150px]">
        <span className="text-[11px] opacity-80">Редизайн сайта</span>
        <strong className="mt-1 text-base">Дизайн главной страницы</strong>
      </div>
      <div className="mt-5 flex justify-between text-[13px] font-bold">
        <span>Прогресс</span>
        <span className="text-primary-500">70%</span>
      </div>
      <Progress className="mt-2.5" value={70} />
      <div className="mt-[18px] flex items-center justify-between text-xs font-bold text-secondary-400">
        <span className="flex items-center gap-1">
          <ClockIcon className="size-4" />3 часа
        </span>
        <AvatarGroup />
      </div>
      <ol className="mt-6 border-t border-border pt-6">
        <li className="mb-4 flex justify-between text-[13px] font-extrabold">
          Подзадачи{' '}
          <span className="text-[11px] font-medium text-secondary-400">
            2 из 3 выполнено
          </span>
        </li>
        {subtasks.map((item, index) => (
          <li
            className="mt-2.5 grid grid-cols-[34px_1fr] items-center gap-3 text-xs"
            key={item}
          >
            <span className="grid size-[34px] place-items-center rounded-lg bg-surface-subtle">
              {index + 1}
            </span>
            {item}
          </li>
        ))}
      </ol>
      <Button className="mt-6 w-full" size="lg">
        Открыть задачу
      </Button>
    </Card>
  )
}
