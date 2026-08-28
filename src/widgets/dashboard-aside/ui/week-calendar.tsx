import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

import { cn } from '@/src/shared/lib'
import { Button, Card } from '@/src/shared/ui'

import { getLocalDateKey, getWeekDays } from '../lib/get-week-days'

const monthFormatter = new Intl.DateTimeFormat('ru-RU', {
  month: 'long',
})

const formatMonthTitle = (date: Date) => {
  const month = monthFormatter.format(date)
  const capitalizedMonth = month[0].toUpperCase() + month.slice(1)

  return `${capitalizedMonth} ${date.getFullYear()}`
}

interface WeekCalendarProps {
  selectedDate: Date
  onDateSelect: (date: Date) => void
}

export const WeekCalendar = ({
  selectedDate,
  onDateSelect,
}: WeekCalendarProps) => {
  const [visibleDate, setVisibleDate] = useState(() => new Date())

  const week = getWeekDays(visibleDate)
  const selectedDateKey = getLocalDateKey(selectedDate)
  const month = formatMonthTitle(visibleDate)

  const handlePreviousWeek = () => {
    setVisibleDate((currentDate) => {
      const previousWeek = new Date(currentDate)
      previousWeek.setDate(previousWeek.getDate() - 7)

      return previousWeek
    })
  }

  const handleNextWeek = () => {
    setVisibleDate((currentDate) => {
      const nextWeek = new Date(currentDate)
      nextWeek.setDate(nextWeek.getDate() + 7)

      return nextWeek
    })
  }

  return (
    <Card className="border-0 px-5 pb-5 pt-6">
      <div className="mb-[22px] flex items-center justify-between text-sm font-extrabold">
        <Button
          aria-label="Предыдущая неделя"
          iconOnly
          size="sm"
          variant="minimal"
          onClick={handlePreviousWeek}
        >
          <ChevronLeftIcon />
        </Button>
        <span>{month}</span>
        <Button
          aria-label="Следующая неделя"
          iconOnly
          size="sm"
          variant="minimal"
          onClick={handleNextWeek}
        >
          <ChevronRightIcon />
        </Button>
      </div>
      <div className="grid grid-cols-7 items-stretch gap-1">
        {week.map(({ date, dateKey, label, dayNumber }) => {
          const selected = dateKey === selectedDateKey
          return (
            <button
              aria-label={`Выбрать ${dayNumber}, ${label}`}
              aria-pressed={selected}
              className={cn(
                'grid min-w-0 justify-items-center gap-2 rounded-[18px] py-1 text-[11px] text-secondary-400 transition-colors hover:bg-surface-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
                selected && 'text-secondary-500',
              )}
              key={dateKey}
              type="button"
              onClick={() => onDateSelect(date)}
            >
              <span>{label}</span>

              <span
                className={cn(
                  'grid size-[34px] place-items-center rounded-full bg-surface-subtle',
                  selected && 'bg-primary-500 text-primary-0',
                )}
              >
                {dayNumber}
              </span>
            </button>
          )
        })}
      </div>
    </Card>
  )
}
