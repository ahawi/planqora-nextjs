import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { cva, type VariantProps } from 'class-variance-authority'
import type { SelectHTMLAttributes } from 'react'

import { cn } from '@/src/shared/lib'

const selectVariants = cva(
  'w-full cursor-pointer appearance-none rounded-xl border-2 border-primary-200 bg-primary-0 font-semibold text-secondary-400 [background-image:none] outline-none transition-colors hover:border-secondary-400 hover:text-secondary-500 focus-visible:border-primary-500 focus-visible:ring-4 focus-visible:ring-primary-100 disabled:pointer-events-none disabled:cursor-not-allowed disabled:border-secondary-100 disabled:text-secondary-300',
  {
    variants: {
      size: {
        sm: 'h-8 py-0 pl-3 pr-9 text-xs',
        md: 'h-10 py-0 pl-4 pr-10 text-sm',
        lg: 'h-12 py-0 pl-5 pr-11 text-base',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
)

interface SelectProps
  extends
    Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'>,
    VariantProps<typeof selectVariants> {
  containerClassName?: string
}

export const Select = ({
  children,
  className,
  containerClassName,
  disabled,
  size,
  ...props
}: SelectProps) => {
  return (
    <span className={cn('relative inline-flex', containerClassName)}>
      <select
        className={cn(selectVariants({ size }), className)}
        disabled={disabled}
        {...props}
      >
        {children}
      </select>
      <ChevronDownIcon
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute right-4 top-1/2 size-5 -translate-y-1/2 text-secondary-400',
          disabled && 'text-secondary-200',
        )}
      />
    </span>
  )
}
