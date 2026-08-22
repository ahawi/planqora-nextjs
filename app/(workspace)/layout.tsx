import type { ReactNode } from 'react'

import { requireSession } from '@/src/shared/lib/index.server'
import { AppSidebar } from '@/src/widgets/app-sidebar'
import { MobileHeader } from '@/src/widgets/dashboard-header'

const WorkspaceLayout = async ({ children }: { children: ReactNode }) => {
  const session = await requireSession()

  return (
    <div className="mx-auto grid h-dvh max-w-[1680px] grid-cols-[250px_minmax(0,1fr)] overflow-hidden bg-primary-0 shadow-xl max-[860px]:flex max-[860px]:flex-col max-[860px]:shadow-none">
      <MobileHeader userName={session.user.name} />
      <AppSidebar />
      <div className="min-h-0 min-w-0 flex-1 overflow-hidden">{children}</div>
    </div>
  )
}

export default WorkspaceLayout
