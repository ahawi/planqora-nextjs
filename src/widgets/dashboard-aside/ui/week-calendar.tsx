import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

import { Button, Card } from '@/src/shared/ui'

const week = [
  ['Пн', '10'],
  ['Вт', '11'],
  ['Ср', '12'],
  ['Чт', '13'],
  ['Пт', '14'],
  ['Сб', '15'],
  ['Вс', '16'],
]

export const WeekCalendar = () => {
  return (
    <Card className="border-0 px-5 pb-5 pt-6">
      <div className="mb-[22px] flex items-center justify-between text-sm font-extrabold">
        <Button
          aria-label="Предыдущая неделя"
          iconOnly
          size="sm"
          variant="minimal"
        >
          <ChevronLeftIcon />
        </Button>
        <span>Август 2026</span>
        <Button
          aria-label="Следующая неделя"
          iconOnly
          size="sm"
          variant="minimal"
        >
          <ChevronRightIcon />
        </Button>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {week.map(([name, date]) => {
          const selected = date === '15'
          return (
            <div
              className={`grid justify-items-center gap-2 text-[11px] text-secondary-400 ${selected ? '-mt-2 rounded-[22px] bg-secondary-500 px-1 pb-1 pt-2 text-primary-0' : ''}`}
              key={date}
            >
              <span>{name}</span>
              <span
                className={`grid size-[34px] place-items-center rounded-full ${selected ? 'bg-primary-500 text-primary-0' : 'bg-surface-subtle'}`}
              >
                {date}
              </span>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
