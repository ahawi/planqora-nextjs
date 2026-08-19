import { Bars3Icon, BellIcon } from '@heroicons/react/24/outline'

import { Button } from '@/src/shared/ui'

function UserActions() {
  return (
    <div className="flex items-center gap-3">
      <Button
        aria-label="Уведомления"
        className="relative rounded-full"
        iconOnly
        variant="secondary"
      >
        <BellIcon />
        <span className="absolute right-1.5 top-1.5 size-2 rounded-full border-2 border-primary-0 bg-error-500" />
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
  )
}

export function MobileHeader() {
  return (
    <header className="hidden min-h-[104px] items-center justify-between border-b border-border bg-primary-0 px-[clamp(20px,7vw,32px)] max-[860px]:flex">
      <Button
        aria-label="Открыть меню"
        className="rounded-full"
        iconOnly
        variant="secondary"
      >
        <Bars3Icon />
      </Button>
      <UserActions />
    </header>
  )
}

interface DashboardHeaderProps {
  subtitle?: string
  title?: string
}

export function DashboardHeader({
  subtitle = 'Давайте завершим важные задачи сегодня.',
  title = 'Привет, Настя!',
}: DashboardHeaderProps) {
  return (
    <header className="mb-[42px] flex items-center justify-between gap-6 [@media(max-height:950px)]:mb-5 max-[860px]:mb-[30px]">
      <div>
        <h1 className="mb-1.5 text-[clamp(23px,2vw,27px)] font-bold tracking-[-0.04em] max-[860px]:text-[clamp(22px,6vw,27px)]">
          {title}
        </h1>
        <p className="text-sm text-secondary-400 max-[860px]:text-[clamp(13px,3.7vw,15px)]">
          {subtitle}
        </p>
      </div>
      <div className="max-[860px]:hidden">
        <UserActions />
      </div>
    </header>
  )
}
