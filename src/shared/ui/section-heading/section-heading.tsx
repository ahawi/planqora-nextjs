import { Button } from '@/src/shared/ui/button'

interface SectionHeadingProps {
  actionLabel: string
  title: string
}

export const SectionHeading = ({ actionLabel, title }: SectionHeadingProps) => {
  return (
    <div className="mb-4 flex items-center justify-between gap-5 min-[861px]:mb-[18px]">
      <h2 className="text-[clamp(21px,2vw,24px)] font-bold tracking-[-0.04em]">
        {title}
      </h2>
      <Button
        className="max-[860px]:size-10 max-[860px]:px-0 max-[860px]:text-[0]"
        variant="minimal"
      >
        <span className="max-[860px]:hidden">{actionLabel}</span>
        <span aria-hidden="true" className="text-xl">
          →
        </span>
      </Button>
    </div>
  )
}
