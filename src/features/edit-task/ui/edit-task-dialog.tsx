import { XMarkIcon } from '@heroicons/react/24/outline'
import { type ReactNode } from 'react'

import { Button } from '@/src/shared/ui'

interface EditTaskDialogProps {
  children: ReactNode
  onClose: () => void
}

export const EditTaskDialog = ({ children, onClose }: EditTaskDialogProps) => {
  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-secondary-900/45 p-5 backdrop-blur-[2px] max-[560px]:p-3"
      role="presentation"
    >
      <section
        aria-describedby="edit-task-dialog-description"
        aria-labelledby="edit-task-dialog-title"
        aria-modal="true"
        className="my-auto w-full max-w-[680px] overflow-hidden rounded-3xl bg-primary-0 shadow-[0_24px_80px_rgba(4,8,21,0.2)] max-[560px]:flex max-[560px]:max-h-[calc(100dvh-24px)] max-[560px]:flex-col max-[560px]:rounded-2xl"
        role="dialog"
      >
        <header className="flex shrink-0 items-start justify-between gap-6 border-b border-border px-8 py-6 max-[560px]:px-5 max-[560px]:py-5">
          <div>
            <h2
              className="text-2xl font-bold tracking-[-0.03em] text-secondary-500 max-[560px]:text-xl"
              id="edit-task-dialog-title"
            >
              Редактировать задачу
            </h2>
            <p
              className="mt-1.5 text-sm leading-5 text-secondary-400"
              id="edit-task-dialog-description"
            >
              Измените основные сведения о задаче
            </p>
          </div>

          <Button
            aria-label="Закрыть окно редактирования задачи"
            iconOnly
            onClick={onClose}
            type="button"
            variant="minimal"
          >
            <XMarkIcon />
          </Button>
        </header>

        <div className="min-h-0 max-h-[calc(100dvh-180px)] overflow-y-auto px-8 py-7 max-[560px]:max-h-none max-[560px]:flex-1 max-[560px]:px-5 max-[560px]:py-6 [scrollbar-width:thin]">
          {children}
        </div>
      </section>
    </div>
  )
}
