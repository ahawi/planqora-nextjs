import { SettingsSkeleton } from '@/src/widgets/settings-skeleton'

const SettingsLoading = () => {
  return (
    <div className="h-full animate-[route-loading-reveal_120ms_ease-out_both]">
      <SettingsSkeleton />
    </div>
  )
}

export default SettingsLoading
