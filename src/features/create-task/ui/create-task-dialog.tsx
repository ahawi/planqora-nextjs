import { XMarkIcon } from '@heroicons/react/24/outline'
import { type ReactNode } from 'react'

import { Button } from '@/src/shared/ui'

interface CreateTaskDialogProps {
  children: ReactNode
  onClose: () => void
}

export const CreateTaskDialog = ({
  children,
  onClose,
}: CreateTaskDialogProps) => {
  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-secondary-900/45 p-5 backdrop-blur-[2px] max-[560px]:items-end max-[560px]:p-0"
      role="presentation"
    >
      <section
        aria-describedby="create-task-dialog-description"
        aria-labelledby="create-task-dialog-title"
        aria-modal="true"
        className="my-auto w-full max-w-[680px] overflow-hidden rounded-3xl bg-primary-0 shadow-[0_24px_80px_rgba(4,8,21,0.2)] max-[560px]:mb-0 max-[560px]:mt-auto max-[560px]:max-h-[calc(100dvh-24px)] max-[560px]:rounded-b-none max-[560px]:rounded-t-3xl"
        role="dialog"
      >
        <header className="flex items-start justify-between gap-6 border-b border-border px-8 py-6 max-[560px]:px-5 max-[560px]:py-5">
          <div>
            <h2
              className="text-2xl font-bold tracking-[-0.03em] text-secondary-500"
              id="create-task-dialog-title"
            >
              Новая задача
            </h2>
            <p
              className="mt-1.5 text-sm leading-5 text-secondary-400"
              id="create-task-dialog-description"
            >
              Заполните основные сведения о задаче
            </p>
          </div>

          <Button
            aria-label="Закрыть окно создания задачи"
            iconOnly
            onClick={onClose}
            type="button"
            variant="minimal"
          >
            <XMarkIcon />
          </Button>
        </header>

        <div className="max-h-[calc(100dvh-180px)] overflow-y-auto px-8 py-7 max-[560px]:max-h-[calc(100dvh-134px)] max-[560px]:px-5 max-[560px]:py-6 [scrollbar-width:thin]">
          {children}
        </div>
      </section>
    </div>
  )
}
