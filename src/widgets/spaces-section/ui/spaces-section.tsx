'use client'

import { SpaceCard, useGetSpacesQuery } from '@/src/entities/space'
import { SectionHeading } from '@/src/shared/ui'

export const SpacesSection = () => {
  const { data: spaces = [], isLoading, error } = useGetSpacesQuery()

  if (isLoading) {
    return (
      <section
        className="mt-[38px] [@media(max-height:950px)]:mt-5 max-[860px]:mt-[34px]"
        role="status"
      >
        <p className="text-sm text-secondary-400">Загрузка пространств...</p>
      </section>
    )
  }

  if (error) {
    return (
      <section className="mt-[38px] [@media(max-height:950px)]:mt-5 max-[860px]:mt-[34px]">
        <p
          className="rounded-xl border border-error-400 bg-error-100 px-4 py-3 text-sm font-medium text-error-600"
          role="alert"
        >
          Не удалось загрузить пространства
        </p>
      </section>
    )
  }

  if (spaces.length === 0) {
    return null
  }

  return (
    <section
      className="mt-[38px] [@media(max-height:950px)]:mt-5 max-[860px]:mt-[34px]"
      id="spaces"
    >
      <SectionHeading actionLabel="Все пространства" title="Пространства" />

      <div className="grid grid-cols-3 gap-4 max-[860px]:-mr-[clamp(20px,7vw,32px)] max-[860px]:auto-cols-[minmax(270px,94%)] max-[860px]:grid-flow-col max-[860px]:grid-cols-none max-[860px]:snap-x max-[860px]:snap-mandatory max-[860px]:overflow-x-auto max-[860px]:pr-[clamp(20px,7vw,32px)] max-[860px]:[scrollbar-width:none] max-[860px]:[&::-webkit-scrollbar]:hidden">
        {spaces.map((space) => (
          <SpaceCard key={space.id} space={space} />
        ))}
      </div>
    </section>
  )
}
