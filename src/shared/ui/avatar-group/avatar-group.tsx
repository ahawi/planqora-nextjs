import { cn } from '@/src/shared/lib'

interface AvatarItem {
  color: string
  initials: string
}

interface AvatarGroupProps {
  items?: AvatarItem[]
}

const defaultItems: AvatarItem[] = [
  { initials: 'АМ', color: 'bg-secondary-400' },
  { initials: 'ЕК', color: 'bg-error-400' },
  { initials: 'МИ', color: 'bg-success-700' },
]

export function AvatarGroup({ items = defaultItems }: AvatarGroupProps) {
  return (
    <div className="flex pl-2" aria-label={`${items.length} участника`}>
      {items.map(({ color, initials }) => (
        <span
          className={cn(
            '-ml-2 grid size-6 place-items-center rounded-full border-2 border-primary-0 text-[8px] text-primary-0',
            color,
          )}
          key={initials}
        >
          {initials}
        </span>
      ))}
    </div>
  )
}
