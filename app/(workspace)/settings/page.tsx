import { delay, ROUTE_SKELETON_DELAY } from '@/src/shared/lib'
import { SettingsPanel } from '@/src/widgets/settings-panel'

export const dynamic = 'force-dynamic'

export default async function SettingsPage() {
  await delay(ROUTE_SKELETON_DELAY)

  return <SettingsPanel />
}
