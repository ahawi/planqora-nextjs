import type { ReactNode } from 'react'

interface DashboardLayoutProps {
  aside: ReactNode
  children: ReactNode
}

export const DashboardLayout = ({ aside, children }: DashboardLayoutProps) => {
  return (
    <div className="grid h-full min-h-0 grid-cols-[minmax(0,1fr)_360px] overflow-hidden max-[1180px]:block">
      <section className="min-w-0 overflow-hidden px-[clamp(20px,3vw,36px)] pb-[clamp(36px,4vw,48px)] pt-[clamp(26px,3vw,38px)] [@media(max-height:950px)]:pb-5 [@media(max-height:950px)]:pt-5 max-[860px]:px-[clamp(20px,7vw,32px)] max-[860px]:pb-12 max-[860px]:pt-8">
        {children}
      </section>
      {aside}
    </div>
  )
}
