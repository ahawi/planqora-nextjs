import { ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/24/outline'

import { Button } from '@/src/shared/ui'

interface DeleteTaskDialogProps {
  taskTitle: string
  onCancel: () => void
  onConfirm: () => void
}

export const DeleteTaskDialog = ({
  taskTitle,
  onCancel,
  onConfirm,
}: DeleteTaskDialogProps) => {
  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-secondary-900/45 p-5 backdrop-blur-[2px] max-[560px]:p-3"
      role="presentation"
    >
      <section
        aria-describedby="delete-task-dialog-description"
        aria-labelledby="delete-task-dialog-title"
        aria-modal="true"
        className="my-auto w-full max-w-[460px] overflow-hidden rounded-3xl bg-primary-0 shadow-[0_24px_80px_rgba(4,8,21,0.2)] max-[560px]:rounded-2xl"
        role="alertdialog"
      >
        <header className="flex items-start justify-between gap-5 px-7 pb-0 pt-7 max-[560px]:px-5 max-[560px]:pt-5">
          <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-error-100 text-error-600 max-[560px]:size-10 max-[560px]:rounded-xl">
            <ExclamationTriangleIcon className="size-6 max-[560px]:size-5" />
          </span>

          <Button
            aria-label="Закрыть окно удаления задачи"
            className="-mr-2 -mt-2"
            iconOnly
            onClick={onCancel}
            type="button"
            variant="minimal"
          >
            <XMarkIcon />
          </Button>
        </header>

        <div className="px-7 pb-7 pt-5 max-[560px]:px-5 max-[560px]:pb-5 max-[560px]:pt-4">
          <h2
            className="text-2xl font-bold tracking-[-0.03em] text-secondary-500 max-[560px]:text-xl"
            id="delete-task-dialog-title"
          >
            Удалить задачу?
          </h2>
          <p
            className="mt-3 text-sm leading-6 text-secondary-400"
            id="delete-task-dialog-description"
          >
            Задача{' '}
            <strong className="font-semibold text-secondary-500">
              &quot;{taskTitle}&quot;
            </strong>{' '}
            будет удалена без возможности восстановления.
          </p>

          <div className="mt-7 flex justify-end gap-3 border-t border-border pt-5 max-[420px]:grid max-[420px]:grid-cols-2">
            <Button
              className="whitespace-nowrap max-[420px]:px-3 max-[420px]:text-sm"
              onClick={onCancel}
              size="lg"
              type="button"
              variant="secondary"
            >
              Отмена
            </Button>
            <Button
              className="whitespace-nowrap bg-error-500 max-[420px]:px-3 max-[420px]:text-sm hover:bg-error-600 active:bg-error-700 focus-visible:ring-error-200 disabled:bg-error-200"
              onClick={onConfirm}
              size="lg"
              type="button"
            >
              Удалить
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
