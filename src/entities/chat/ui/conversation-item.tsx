import Image from 'next/image'

import type { Conversation } from '../model/types'

export function ConversationItem({
  active = false,
  conversation,
}: {
  active?: boolean
  conversation: Conversation
}) {
  return (
    <article
      className={`flex min-w-0 items-center gap-3 rounded-xl p-3 transition-colors ${active ? 'bg-surface-subtle' : 'hover:bg-surface-muted'} max-[860px]:w-full max-[860px]:rounded-none max-[860px]:border-b max-[860px]:border-border max-[860px]:px-2 max-[860px]:py-5`}
    >
      <div className="relative shrink-0">
        <Image
          alt=""
          className="size-12 rounded-full object-cover"
          height={48}
          src={conversation.avatar}
          width={48}
        />
        {conversation.online && (
          <span className="absolute bottom-0 right-0 size-3 rounded-full border-2 border-primary-0 bg-success-600" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <h3 className="truncate text-sm font-bold">{conversation.name}</h3>
          <time className="shrink-0 text-[10px] text-secondary-300">
            {conversation.time}
          </time>
        </div>
        <div className="mt-1 flex items-center gap-2">
          <p className="truncate text-xs text-secondary-400">
            {conversation.preview}
          </p>
          {conversation.unread && (
            <span className="size-2 shrink-0 rounded-full bg-error-500" />
          )}
        </div>
      </div>
    </article>
  )
}
