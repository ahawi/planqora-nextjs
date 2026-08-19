import { BellIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'

import { Button } from '@/src/shared/ui'

export function SettingsHeader() {
  return (
    <header className="flex min-h-28 shrink-0 items-center justify-between border-b border-border bg-primary-0 px-9 max-[860px]:min-h-32 max-[860px]:items-end max-[860px]:border-b-0 max-[860px]:px-7 max-[860px]:pb-7">
      <h1 className="text-2xl font-bold text-secondary-500">Настройки</h1>
      <div className="flex items-center gap-4 max-[860px]:hidden">
        <Button
          aria-label="Уведомления"
          className="relative rounded-full"
          iconOnly
          size="lg"
          variant="secondary"
        >
          <BellIcon />
          <span className="absolute right-2 top-2 size-2 rounded-full bg-error-500" />
        </Button>
        <Image
          alt="Профиль пользователя"
          className="size-12 rounded-full object-cover"
          height={48}
          src="/customers/delba-de-oliveira.png"
          width={48}
        />
      </div>
    </header>
  )
}
