import { cn } from '@/src/shared/lib'

interface ProgressProps {
  className?: string
  value: number
}

export function Progress({ className, value }: ProgressProps) {
  const normalizedValue = Math.min(100, Math.max(0, value))

  return (
    <div
      aria-label={`Выполнено ${normalizedValue}%`}
      aria-valuemax={100}
      aria-valuemin={0}
      aria-valuenow={normalizedValue}
      className={cn(
        'h-1.5 overflow-hidden rounded-full bg-primary-100',
        className,
      )}
      role="progressbar"
    >
      <div
        className="h-full rounded-full bg-primary-500 transition-[width]"
        style={{ width: `${normalizedValue}%` }}
      />
    </div>
  )
}
