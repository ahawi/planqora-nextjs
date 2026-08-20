'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useId } from 'react'
import { useForm } from 'react-hook-form'

import { priorityLabels, statusLabels, type Task } from '@/src/entities/task'
import { Button, Select } from '@/src/shared/ui'

import { editTaskSchema } from '../model/edit-task-schema'
import { type EditTaskInput } from '../model/types'

interface EditTaskFormProps {
  task: Task
  onCancel: () => void
  onSubmit: (input: EditTaskInput) => void
}

const statuses = Object.entries(statusLabels) as [Task['status'], string][]

const priorities = Object.entries(priorityLabels) as [
  Task['priority'],
  string,
][]

const controlClassName =
  'h-12 w-full rounded-xl border-2 border-primary-200 bg-primary-0 px-4 text-sm font-medium text-secondary-500 outline-none transition-colors placeholder:text-secondary-300 hover:border-secondary-300 focus:border-primary-500 focus:ring-4 focus:ring-primary-100'

export const EditTaskForm = ({
  task,
  onCancel,
  onSubmit,
}: EditTaskFormProps) => {
  const formId = useId()
  const fieldId = (name: keyof EditTaskInput) => `${formId}-${name}`

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<EditTaskInput>({
    resolver: zodResolver(editTaskSchema),
    defaultValues: {
      title: task.title,
      deadline: task.deadline,
      status: task.status,
      priority: task.priority,
      tag: task.tag,
      assignee: task.assignee,
      space: task.space,
    },
  })

  const errorId = (name: keyof EditTaskInput): string => {
    return `${fieldId(name)}-error`
  }

  return (
    <form className="grid gap-6" noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-5">
        <label className="grid gap-2" htmlFor={fieldId('title')}>
          <span className="text-sm font-bold text-secondary-500">
            Название задачи <span className="text-error-500">*</span>
          </span>
          <input
            {...register('title')}
            autoFocus
            className={controlClassName}
            id={fieldId('title')}
            maxLength={100}
            placeholder="Например, подготовить презентацию"
            required
            type="text"
            aria-invalid={Boolean(errors.title)}
            aria-describedby={errors.title ? errorId('title') : undefined}
            aria-required="true"
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
              className={`${controlClassName} font-semibold [color-scheme:light]`}
              id={fieldId('deadline')}
              required
              type="date"
              aria-describedby={
                errors.deadline ? errorId('deadline') : undefined
              }
              aria-invalid={Boolean(errors.deadline)}
              aria-required="true"
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
              aria-describedby={errors.status ? errorId('status') : undefined}
              aria-invalid={Boolean(errors.status)}
            >
              {statuses.map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </Select>
            {errors.status && (
              <span
                className="text-xs font-medium text-error-600"
                id={errorId('status')}
                role="alert"
              >
                {errors.status.message}
              </span>
            )}
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
              aria-describedby={
                errors.priority ? errorId('priority') : undefined
              }
              aria-invalid={Boolean(errors.priority)}
            >
              {priorities.map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </Select>
            {errors.priority && (
              <span
                className="text-xs font-medium text-error-600"
                id={errorId('priority')}
                role="alert"
              >
                {errors.priority.message}
              </span>
            )}
          </label>

          <label className="grid gap-2" htmlFor={fieldId('tag')}>
            <span className="text-sm font-bold text-secondary-500">Тег</span>
            <input
              {...register('tag')}
              className={controlClassName}
              id={fieldId('tag')}
              placeholder="Например, Дизайн"
              type="text"
              aria-describedby={errors.tag ? errorId('tag') : undefined}
              aria-invalid={Boolean(errors.tag)}
            />
            {errors.tag && (
              <span
                className="text-xs font-medium text-error-600"
                id={errorId('tag')}
                role="alert"
              >
                {errors.tag.message}
              </span>
            )}
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
              aria-describedby={
                errors.assignee ? errorId('assignee') : undefined
              }
              aria-invalid={Boolean(errors.assignee)}
            />
            {errors.assignee && (
              <span
                className="text-xs font-medium text-error-600"
                id={errorId('assignee')}
                role="alert"
              >
                {errors.assignee.message}
              </span>
            )}
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
              aria-describedby={errors.space ? errorId('space') : undefined}
              aria-invalid={Boolean(errors.space)}
            />
            {errors.space && (
              <span
                className="text-xs font-medium text-error-600"
                id={errorId('space')}
                role="alert"
              >
                {errors.space.message}
              </span>
            )}
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
          size="lg"
          type="submit"
          disabled={isSubmitting}
        >
          Сохранить
        </Button>
      </div>
    </form>
  )
}
