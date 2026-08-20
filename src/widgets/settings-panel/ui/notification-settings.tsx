'use client'

import { useState } from 'react'

import { Button, Switch } from '@/src/shared/ui'

const notificationOptions = [
  { id: 'messages', label: 'Сообщения', enabled: true },
  { id: 'task-updates', label: 'Обновления задач', enabled: false },
  { id: 'deadlines', label: 'Сроки задач', enabled: true },
  { id: 'space-updates', label: 'Обновления пространств', enabled: false },
]

export const NotificationSettings = () => {
  const [values, setValues] = useState(() =>
    Object.fromEntries(
      notificationOptions.map(({ enabled, id }) => [id, enabled]),
    ),
  )

  return (
    <div className="flex max-w-[510px] flex-col pt-9 max-[860px]:min-h-[calc(100vh-352px)] max-[860px]:max-w-none max-[860px]:rounded-2xl max-[860px]:bg-primary-0 max-[860px]:p-7 max-[480px]:p-5">
      <div className="space-y-7">
        {notificationOptions.map(({ id, label }) => (
          <div className="flex items-center gap-6" key={id}>
            <Switch
              aria-label={label}
              checked={Boolean(values[id])}
              onCheckedChange={(checked) =>
                setValues((current) => ({ ...current, [id]: checked }))
              }
            />
            <span className="text-sm font-bold text-secondary-500">
              {label}
            </span>
          </div>
        ))}
      </div>
      <Button
        className="mt-14 w-[275px] max-w-full max-[860px]:mt-auto max-[860px]:w-full"
        size="lg"
      >
        Сохранить изменения
      </Button>
    </div>
  )
}
