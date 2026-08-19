import { Card } from '@/src/shared/ui'

export function RunningTasksCard() {
  return (
    <Card className="min-h-[238px] border-0 bg-secondary-500 p-[26px] text-primary-0 [@media(max-height:950px)]:min-h-[190px] [@media(max-height:950px)]:p-5 max-[860px]:min-h-[124px] max-[860px]:p-5">
      <h2 className="text-base font-semibold max-[860px]:text-sm">
        Активные задачи
      </h2>
      <div className="my-[26px] text-[49px] leading-none tracking-[-0.05em] [@media(max-height:950px)]:my-3 [@media(max-height:950px)]:text-4xl max-[860px]:mb-0 max-[860px]:mt-6 max-[860px]:inline-block max-[860px]:text-4xl">
        12
      </div>
      <div className="flex items-center gap-4 max-[860px]:float-right max-[860px]:-mt-1">
        <div
          className="grid size-[76px] place-items-center rounded-full max-[860px]:size-[70px]"
          style={{
            background:
              'conic-gradient(var(--primary-500) 0 45%, var(--secondary-400) 45% 100%)',
          }}
        >
          <span className="grid size-[62px] place-items-center rounded-full bg-secondary-500 text-lg max-[860px]:size-[58px]">
            45%
          </span>
        </div>
        <div>
          <strong className="block text-[23px]">27</strong>
          <span className="text-[13px] text-secondary-300">всего задач</span>
        </div>
      </div>
    </Card>
  )
}
