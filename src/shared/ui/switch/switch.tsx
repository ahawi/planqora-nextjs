'use client'

import type { ButtonHTMLAttributes } from 'react'

import { cn } from '@/src/shared/lib'

interface SwitchProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'onChange'
> {
  checked: boolean
  onCheckedChange?: (checked: boolean) => void
}

export const Switch = ({
  checked,
  className,
  disabled,
  onCheckedChange,
  ...props
}: SwitchProps) => {
  return (
    <button
      aria-checked={checked}
      className={cn(
        'relative h-8 w-14 rounded-full border border-border bg-primary-0 p-1 outline-none transition-colors focus-visible:ring-4 focus-visible:ring-primary-100 disabled:cursor-not-allowed disabled:opacity-50',
        checked && 'border-primary-200 bg-primary-100',
        className,
      )}
      disabled={disabled}
      onClick={() => onCheckedChange?.(!checked)}
      role="switch"
      type="button"
      {...props}
    >
      <span
        className={cn(
          'block size-6 rounded-full bg-surface-subtle transition-transform',
          checked && 'translate-x-6 bg-primary-500',
        )}
      />
    </button>
  )
}
