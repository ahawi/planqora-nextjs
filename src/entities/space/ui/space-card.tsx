import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline'

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Progress,
} from '@/src/shared/ui'

import type { Space } from '../model/types'

const toneClasses: Record<Space['tone'], string> = {
  primary: 'bg-primary-600',
  success: 'bg-success-600',
  warning: 'bg-warning-600',
}

export function SpaceCard({ space }: { space: Space }) {
  return (
    <Card className="snap-start p-5 transition [@media(max-height:950px)]:p-3 hover:-translate-y-0.5 hover:shadow-lg">
      <CardHeader>
        <span
          className={`grid size-11 place-items-center rounded-[13px] text-sm font-extrabold text-primary-0 [@media(max-height:950px)]:size-9 ${toneClasses[space.tone]}`}
        >
          {space.icon}
        </span>
        <Button
          aria-label={`Меню пространства ${space.title}`}
          iconOnly
          size="sm"
          variant="minimal"
        >
          <EllipsisHorizontalIcon />
        </Button>
      </CardHeader>
      <CardContent>
        <h3 className="mb-1 mt-[18px] truncate text-[15px] font-bold [@media(max-height:950px)]:mt-2">
          {space.title}
        </h3>
        <p className="text-xs text-secondary-400">{space.description}</p>
        <div className="mt-[19px] flex justify-between text-[11px] font-bold text-secondary-400 [@media(max-height:950px)]:mt-2">
          <span>{space.tasks} задач</span>
          <span>{space.progress}%</span>
        </div>
        <Progress className="mt-2.5" value={space.progress} />
      </CardContent>
    </Card>
  )
}
