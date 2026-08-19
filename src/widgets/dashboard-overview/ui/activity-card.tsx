import { Card } from '@/src/shared/ui'

export function ActivityCard() {
  return (
    <Card className="border-0 bg-surface-muted p-[26px] [@media(max-height:950px)]:p-5 max-[860px]:p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold">Активность</h2>
        <span className="text-xs font-bold text-secondary-400">
          Эта неделя⌄
        </span>
      </div>
      <div className="relative mt-[22px] h-[150px] overflow-hidden rounded-[14px] bg-primary-0 [@media(max-height:950px)]:mt-3 [@media(max-height:950px)]:h-[120px] max-[860px]:mt-4 max-[860px]:h-[130px]">
        <svg
          aria-label="График активности за неделю"
          className="absolute inset-x-3.5 bottom-6 top-2.5 h-[calc(100%-35px)] w-[calc(100%-28px)]"
          preserveAspectRatio="none"
          viewBox="0 0 600 130"
        >
          <path
            d="M0 103 C60 76 77 50 120 66 S195 120 246 61 S324 32 365 71 S430 74 471 53 S542 60 600 58"
            fill="none"
            stroke="var(--secondary-500)"
            strokeLinecap="round"
            strokeWidth="5"
          />
          <path
            d="M0 112 C65 94 86 69 124 83 S197 121 245 82 S320 61 366 88 S435 76 475 70 S540 73 600 75"
            fill="none"
            stroke="var(--secondary-100)"
            strokeLinecap="round"
            strokeWidth="5"
          />
          <circle
            cx="120"
            cy="66"
            fill="var(--primary-0)"
            r="8"
            stroke="var(--primary-500)"
            strokeWidth="6"
          />
        </svg>
        <div className="absolute inset-x-4 bottom-2 flex justify-between text-[11px] text-secondary-300">
          {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day) => (
            <span key={day}>{day}</span>
          ))}
        </div>
      </div>
    </Card>
  )
}
