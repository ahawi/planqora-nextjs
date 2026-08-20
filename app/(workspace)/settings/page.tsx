import { delay, ROUTE_SKELETON_DELAY } from '@/src/shared/lib'
import { SettingsPanel } from '@/src/widgets/settings-panel'

export const dynamic = 'force-dynamic'

const SettingsPage = async () => {
  await delay(ROUTE_SKELETON_DELAY)

  return <SettingsPanel />
}

export default SettingsPage
