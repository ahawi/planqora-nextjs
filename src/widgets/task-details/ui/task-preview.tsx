import { PauseIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'

export const TaskPreview = () => {
  return (
    <div className="relative aspect-[16/8.2] min-h-[260px] overflow-hidden rounded-[16px] max-[620px]:aspect-[4/3]">
      <Image
        alt="Превью редизайна сайта"
        className="object-cover"
        fill
        priority
        sizes="(max-width: 860px) 100vw, 70vw"
        src="/mockups/orbit-kanban-dashboard.png"
      />
      <div className="absolute inset-x-5 bottom-5 flex h-12 items-center gap-4 rounded-xl bg-primary-0/95 px-4 shadow-lg backdrop-blur max-[520px]:inset-x-3 max-[520px]:bottom-3">
        <PauseIcon className="size-5 fill-secondary-500" />
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary-100">
          <span className="block h-full w-2/5 rounded-full bg-secondary-500" />
        </div>
        <span className="text-xs font-semibold">02:20 / 10:00</span>
      </div>
    </div>
  )
}
