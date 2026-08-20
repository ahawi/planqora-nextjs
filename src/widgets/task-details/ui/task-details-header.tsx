import {
  AdjustmentsHorizontalIcon,
  BellIcon,
  MagnifyingGlassIcon,
  Squares2X2Icon,
} from '@heroicons/react/24/outline'

import type { Task } from '@/src/entities/task'
import { Button } from '@/src/shared/ui'

export const TaskDetailsHeader = ({ task }: { task: Task }) => {
  return (
    <header className="shrink-0 bg-primary-0 px-[clamp(20px,3vw,36px)] pb-7 pt-[clamp(26px,3vw,38px)] max-[860px]:px-[clamp(20px,7vw,32px)]">
      <div className="mb-8 flex items-center justify-between gap-5">
        <div>
          <p className="mb-1 text-xs text-secondary-400">
            Мои задачи&nbsp; / &nbsp;{task.space}
          </p>
          <h1 className="text-[clamp(24px,3vw,30px)] font-bold tracking-[-0.04em]">
            Детали задачи
          </h1>
        </div>
        <div className="flex items-center gap-3 max-[860px]:hidden">
          <Button
            aria-label="Уведомления"
            className="relative rounded-full"
            iconOnly
            variant="secondary"
          >
            <BellIcon />
            <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-error-500" />
          </Button>
          <Button
            aria-label="Профиль Насти"
            className="rounded-full bg-gradient-to-br from-warning-300 to-secondary-400 text-primary-0"
            iconOnly
            variant="minimal"
          >
            Н
          </Button>
        </div>
      </div>
      <div className="flex items-center gap-4 max-[720px]:flex-wrap">
        <label className="flex h-12 min-w-[250px] flex-1 items-center gap-3 rounded-xl border border-border px-4 text-secondary-300 focus-within:border-primary-300 focus-within:ring-4 focus-within:ring-primary-100">
          <MagnifyingGlassIcon className="size-5" />
          <input
            className="w-full border-0 bg-transparent p-0 text-sm text-secondary-500 outline-none ring-0 placeholder:text-secondary-300 focus:ring-0"
            placeholder="Поиск задачи"
            type="search"
          />
        </label>
        <Button size="lg" variant="secondary">
          <Squares2X2Icon />
          Категория
        </Button>
        <Button size="lg" variant="secondary">
          <AdjustmentsHorizontalIcon />
          По сроку
        </Button>
      </div>
    </header>
  )
}
