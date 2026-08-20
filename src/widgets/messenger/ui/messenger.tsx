import {
  BellIcon,
  MagnifyingGlassIcon,
  PaperAirplaneIcon,
  PaperClipIcon,
  PhoneIcon,
  VideoCameraIcon,
} from '@heroicons/react/24/outline'
import Image from 'next/image'

import {
  ConversationItem,
  conversationsMock,
  MessageBubble,
  messagesMock,
} from '@/src/entities/chat'
import { Button } from '@/src/shared/ui/button'

const activeConversation = conversationsMock[0]

export const Messenger = () => {
  return (
    <section className="flex h-full min-h-0 flex-col overflow-hidden bg-primary-0">
      <header className="flex min-h-28 shrink-0 items-center justify-between border-b border-border px-8 max-[860px]:min-h-32 max-[860px]:items-end max-[860px]:border-b-0 max-[860px]:px-7 max-[860px]:pb-7">
        <h1 className="text-2xl font-bold text-secondary-500">Сообщения</h1>
        <div className="flex items-center gap-4 max-[860px]:hidden">
          <Button aria-label="Уведомления" iconOnly size="lg" variant="minimal">
            <span className="relative">
              <BellIcon />
              <span className="absolute right-0 top-0 size-2 rounded-full bg-error-500" />
            </span>
          </Button>
          <Image
            alt="Профиль пользователя"
            className="size-12 rounded-full object-cover"
            height={48}
            src="/customers/delba-de-oliveira.png"
            width={48}
          />
        </div>
      </header>

      <div className="grid min-h-0 flex-1 grid-cols-[360px_minmax(0,1fr)] max-[1060px]:grid-cols-[310px_minmax(0,1fr)] max-[860px]:grid-cols-1">
        <aside className="flex min-h-0 flex-col overflow-hidden border-r border-border px-5 py-6 max-[860px]:border-r-0 max-[860px]:px-7 max-[860px]:pb-0 max-[860px]:pt-2 max-[480px]:px-5">
          <label className="flex h-12 shrink-0 items-center gap-3 rounded-xl border border-border px-4 text-secondary-300 focus-within:border-primary-300 focus-within:ring-4 focus-within:ring-primary-100">
            <input
              aria-label="Поиск собеседника"
              className="min-w-0 flex-1 bg-transparent text-sm text-secondary-500 outline-none placeholder:text-secondary-300"
              placeholder="Поиск"
              type="search"
            />
            <MagnifyingGlassIcon className="size-5 shrink-0 text-secondary-500" />
          </label>

          <div className="mt-5 min-h-0 flex-1 space-y-1 overflow-y-auto max-[860px]:space-y-0">
            {conversationsMock.map((conversation, index) => (
              <ConversationItem
                active={index === 0}
                conversation={conversation}
                key={conversation.id}
              />
            ))}
          </div>
        </aside>

        <div className="flex min-h-0 flex-col max-[860px]:hidden">
          <header className="flex min-h-24 items-center justify-between border-b border-border px-8 max-[760px]:min-h-20 max-[760px]:px-4">
            <div className="flex min-w-0 items-center gap-3">
              <div className="relative shrink-0">
                <Image
                  alt=""
                  className="size-12 rounded-full object-cover"
                  height={48}
                  src={activeConversation.avatar}
                  width={48}
                />
                <span className="absolute bottom-0 right-0 size-3 rounded-full border-2 border-primary-0 bg-success-600" />
              </div>
              <div className="min-w-0">
                <h2 className="truncate font-bold text-secondary-500">
                  {activeConversation.name}
                </h2>
                <p className="mt-1 text-xs text-secondary-400">В сети</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                aria-label="Видеозвонок"
                iconOnly
                size="lg"
                variant="secondary"
              >
                <VideoCameraIcon />
              </Button>
              <Button
                aria-label="Позвонить"
                iconOnly
                size="lg"
                variant="secondary"
              >
                <PhoneIcon />
              </Button>
            </div>
          </header>

          <div className="min-h-[520px] flex-1 overflow-y-auto bg-surface-muted px-8 py-6 max-[760px]:min-h-[460px] max-[760px]:px-4">
            <div className="mx-auto mb-6 w-fit rounded-xl bg-secondary-500 px-4 py-2 text-xs font-semibold text-primary-0">
              Сегодня
            </div>
            <div className="space-y-5">
              {messagesMock.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}
            </div>
          </div>

          <form className="flex min-h-20 items-center gap-2 border-t border-border bg-primary-0 px-8 max-[760px]:px-4">
            <input
              aria-label="Новое сообщение"
              className="min-w-0 flex-1 bg-transparent text-sm text-secondary-500 outline-none placeholder:text-secondary-300"
              placeholder="Напишите сообщение..."
              type="text"
            />
            <Button aria-label="Прикрепить файл" iconOnly variant="minimal">
              <PaperClipIcon />
            </Button>
            <Button aria-label="Отправить сообщение" iconOnly>
              <PaperAirplaneIcon />
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
