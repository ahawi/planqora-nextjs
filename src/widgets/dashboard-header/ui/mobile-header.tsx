import { Bars3Icon } from '@heroicons/react/24/outline'

import { Button } from '@/src/shared/ui'

import { UserActions } from './user-actions'

interface MobileHeaderProps {
  userName: string
}

export const MobileHeader = ({ userName }: MobileHeaderProps) => {
  return (
    <header className="hidden min-h-[104px] items-center justify-between border-b border-border bg-primary-0 px-[clamp(20px,7vw,32px)] max-[860px]:flex max-[520px]:min-h-[72px] max-[520px]:px-4">
      <Button
        aria-label="Открыть меню"
        className="rounded-full max-[520px]:size-9"
        iconOnly
        variant="secondary"
      >
        <Bars3Icon />
      </Button>
      <UserActions userName={userName} />
    </header>
  )
}
