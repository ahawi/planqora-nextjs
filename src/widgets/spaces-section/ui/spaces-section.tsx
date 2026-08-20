import { SpaceCard, spacesMock } from '@/src/entities/space'
import { SectionHeading } from '@/src/shared/ui'

export const SpacesSection = () => {
  return (
    <section
      className="mt-[38px] [@media(max-height:950px)]:mt-5 max-[860px]:mt-[34px]"
      id="spaces"
    >
      <SectionHeading actionLabel="Все пространства" title="Пространства" />
      <div className="grid grid-cols-3 gap-4 max-[860px]:-mr-[clamp(20px,7vw,32px)] max-[860px]:auto-cols-[minmax(270px,94%)] max-[860px]:grid-flow-col max-[860px]:grid-cols-none max-[860px]:snap-x max-[860px]:snap-mandatory max-[860px]:overflow-x-auto max-[860px]:pr-[clamp(20px,7vw,32px)] max-[860px]:[scrollbar-width:none] max-[860px]:[&::-webkit-scrollbar]:hidden">
        {spacesMock.map((space) => (
          <SpaceCard key={space.title} space={space} />
        ))}
      </div>
    </section>
  )
}
