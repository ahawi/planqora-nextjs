import Image from 'next/image'

import type { ChatMessage } from '../model/types'

export const MessageBubble = ({ message }: { message: ChatMessage }) => {
  const outgoing = message.direction === 'outgoing'

  return (
    <div
      className={`flex max-w-[72%] flex-col ${outgoing ? 'ml-auto items-end' : 'items-start'} max-[620px]:max-w-[88%]`}
    >
      {message.attachment && (
        <div
          className={`overflow-hidden rounded-2xl p-2 ${outgoing ? 'bg-primary-500 text-primary-0' : 'border border-border bg-primary-0'}`}
        >
          <div className="relative aspect-[16/8] w-[min(420px,55vw)] overflow-hidden rounded-xl">
            <Image
              alt="Вложение к сообщению"
              className="object-cover"
              fill
              sizes="(max-width: 620px) 75vw, 420px"
              src={message.attachment.image}
            />
          </div>
          <p className="px-1 pb-1 pt-3 text-sm">{message.attachment.caption}</p>
        </div>
      )}
      {message.text && (
        <p
          className={`rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${outgoing ? 'rounded-br-md bg-primary-500 text-primary-0' : 'rounded-bl-md border border-border bg-primary-0 text-secondary-500'}`}
        >
          {message.text}
        </p>
      )}
      <time className="mt-1.5 px-1 text-[10px] text-secondary-300">
        Сегодня, {message.time}
      </time>
    </div>
  )
}
