'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useId } from 'react'
import { useForm } from 'react-hook-form'

import { priorityLabels, statusLabels, type Task } from '@/src/entities/task'
import { cn } from '@/src/shared/lib'
import { Button, Select } from '@/src/shared/ui'

import { createTaskSchema } from '../model/create-task-schema'
import { type CreateTaskInput } from '../model/types'

interface CreateTaskFormProps {
  initialStatus?: Task['status']
  onSubmit: (input: CreateTaskInput) => void
  onCancel: () => void
}

const statuses = Object.entries(statusLabels) as [Task['status'], string][]

const priorities = Object.entries(priorityLabels) as [
  Task['priority'],
  string,
][]

const controlClassName =
  'h-12 w-full rounded-xl border-2 border-primary-200 bg-primary-0 px-4 text-sm font-medium text-secondary-500 outline-none transition-colors placeholder:text-secondary-300 hover:border-secondary-300 focus:border-primary-500 focus:ring-4 focus:ring-primary-100'

const invalidControlClassName =
  'border-error-400 hover:border-error-500 focus:border-error-500 focus:ring-error-100'

export const CreateTaskForm = ({
  initialStatus,
  onCancel,
  onSubmit,
}: CreateTaskFormProps) => {
  const formId = useId()
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<CreateTaskInput>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      title: '',
      deadline: '',
      status: initialStatus ?? 'backlog',
      priority: 'medium',
      tag: '',
      assignee: '',
      space: '',
    },
  })

  const fieldId = (name: keyof CreateTaskInput) => `${formId}-${name}`
  const errorId = (name: keyof CreateTaskInput) => `${fieldId(name)}-error`

  return (
    <form className="grid gap-6" noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-5">
        <label className="grid gap-2" htmlFor={fieldId('title')}>
          <span className="text-sm font-bold text-secondary-500">
            Название задачи <span className="text-error-500">*</span>
          </span>
          <input
            {...register('title')}
            aria-describedby={errors.title ? errorId('title') : undefined}
            aria-invalid={Boolean(errors.title)}
            aria-required="true"
            autoFocus
            className={cn(
              controlClassName,
              errors.title && invalidControlClassName,
            )}
            id={fieldId('title')}
            maxLength={100}
            placeholder="Например, подготовить презентацию"
            type="text"
          />
          {errors.title && (
            <span
              className="text-xs font-medium text-error-600"
              id={errorId('title')}
              role="alert"
            >
              {errors.title.message}
            </span>
          )}
        </label>

        <div className="grid grid-cols-2 gap-4 max-[560px]:grid-cols-1">
          <label className="grid gap-2" htmlFor={fieldId('deadline')}>
            <span className="text-sm font-bold text-secondary-500">
              Срок выполнения <span className="text-error-500">*</span>
            </span>
            <input
              {...register('deadline')}
              aria-describedby={
                errors.deadline ? errorId('deadline') : undefined
              }
              aria-invalid={Boolean(errors.deadline)}
              aria-required="true"
              className={cn(
                controlClassName,
                'font-semibold [color-scheme:light]',
                errors.deadline && invalidControlClassName,
              )}
              id={fieldId('deadline')}
              type="date"
            />
            {errors.deadline && (
              <span
                className="text-xs font-medium text-error-600"
                id={errorId('deadline')}
                role="alert"
              >
                {errors.deadline.message}
              </span>
            )}
          </label>

          <label
            className="grid content-start gap-2"
            htmlFor={fieldId('status')}
          >
            <span className="text-sm font-bold text-secondary-500">Статус</span>
            <Select
              {...register('status')}
              className="h-12"
              id={fieldId('status')}
              size="lg"
            >
              {statuses.map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </Select>
          </label>
        </div>

        <div className="grid grid-cols-2 gap-4 max-[560px]:grid-cols-1">
          <label className="grid gap-2" htmlFor={fieldId('priority')}>
            <span className="text-sm font-bold text-secondary-500">
              Приоритет
            </span>
            <Select
              {...register('priority')}
              className="h-12"
              id={fieldId('priority')}
              size="lg"
            >
              {priorities.map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </Select>
          </label>

          <label className="grid gap-2" htmlFor={fieldId('tag')}>
            <span className="text-sm font-bold text-secondary-500">Тег</span>
            <input
              {...register('tag')}
              className={controlClassName}
              id={fieldId('tag')}
              placeholder="Например, Дизайн"
              type="text"
            />
          </label>
        </div>

        <div className="grid grid-cols-2 gap-4 max-[560px]:grid-cols-1">
          <label className="grid gap-2" htmlFor={fieldId('assignee')}>
            <span className="text-sm font-bold text-secondary-500">
              Исполнитель
            </span>
            <input
              {...register('assignee')}
              className={controlClassName}
              id={fieldId('assignee')}
              placeholder="Имя исполнителя"
              type="text"
            />
          </label>

          <label className="grid gap-2" htmlFor={fieldId('space')}>
            <span className="text-sm font-bold text-secondary-500">
              Пространство
            </span>
            <input
              {...register('space')}
              className={controlClassName}
              id={fieldId('space')}
              placeholder="Название пространства"
              type="text"
            />
          </label>
        </div>
      </div>

      <div className="flex justify-end gap-3 border-t border-border pt-5 max-[420px]:grid max-[420px]:grid-cols-2">
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
          className="whitespace-nowrap max-[420px]:px-3 max-[420px]:text-sm"
          disabled={isSubmitting}
          size="lg"
          type="submit"
        >
          Создать задачу
        </Button>
      </div>
    </form>
  )
}
