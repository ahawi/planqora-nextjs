import { BellIcon } from '@heroicons/react/24/outline'

import { Button } from '@/src/shared/ui'

interface UserActionsProps {
  userName: string
}

export const UserActions = ({ userName }: UserActionsProps) => {
  const userInitial = userName.trim().toUpperCase()[0]

  return (
    <div className="flex items-center gap-3 max-[520px]:gap-2">
      <Button
        aria-label="Уведомления"
        className="relative rounded-full max-[520px]:size-9"
        iconOnly
        variant="secondary"
      >
        <BellIcon />
        <span className="absolute right-1.5 top-1.5 size-2 rounded-full border-2 border-primary-0 bg-error-500" />
      </Button>
      <Button
        aria-label={`Профиль ${userName}`}
        className="rounded-full bg-gradient-to-br from-warning-300 to-secondary-400 text-primary-0 max-[520px]:size-9"
        iconOnly
        variant="minimal"
      >
        {userInitial}
      </Button>
    </div>
  )
}
