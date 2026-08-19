import { SettingsSkeleton } from '@/src/widgets/settings-skeleton'

export default function SettingsLoading() {
  return (
    <div className="h-full animate-[route-loading-reveal_120ms_ease-out_both]">
      <SettingsSkeleton />
    </div>
  )
}
