import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import type { ButtonHTMLAttributes } from 'react'

import { cn } from '@/src/shared/lib'

const buttonVariants = cva(
  'inline-flex shrink-0 items-center justify-center gap-2 rounded-xl font-semibold outline-none transition-colors focus-visible:ring-4 disabled:pointer-events-none disabled:cursor-not-allowed [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        primary:
          'bg-primary-500 text-primary-0 hover:bg-primary-600 active:bg-primary-700 focus-visible:ring-primary-200 disabled:bg-primary-200',
        secondary:
          'border-2 border-primary-200 bg-primary-0 text-secondary-400 hover:border-secondary-400 hover:text-secondary-500 active:bg-secondary-100 focus-visible:border-primary-500 focus-visible:ring-primary-100 disabled:border-secondary-100 disabled:text-secondary-300',
        minimal:
          'border-2 border-transparent bg-transparent text-secondary-300 hover:bg-primary-0 hover:text-secondary-500 active:bg-secondary-100 focus-visible:border-primary-300 focus-visible:text-secondary-500 focus-visible:ring-primary-100 disabled:text-secondary-300',
      },
      size: {
        sm: 'h-8 px-3 text-xs [&_svg]:size-4',
        md: 'h-10 px-4 text-sm [&_svg]:size-[18px]',
        lg: 'h-12 px-5 text-base [&_svg]:size-5',
      },
      iconOnly: {
        true: 'px-0',
        false: '',
      },
    },
    compoundVariants: [
      { size: 'sm', iconOnly: true, className: 'w-8' },
      { size: 'md', iconOnly: true, className: 'w-10' },
      { size: 'lg', iconOnly: true, className: 'w-12' },
    ],
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      iconOnly: false,
    },
  },
)

interface ButtonProps
  extends
    ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

export function Button({
  asChild = false,
  className,
  iconOnly,
  size,
  type,
  variant,
  ...props
}: ButtonProps) {
  const Component = asChild ? Slot : 'button'

  return (
    <Component
      className={cn(buttonVariants({ variant, size, iconOnly }), className)}
      type={asChild ? undefined : (type ?? 'button')}
      {...props}
    />
  )
}
