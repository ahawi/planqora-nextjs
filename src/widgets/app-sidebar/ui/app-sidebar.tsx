'use client'

import {
  ChatBubbleLeftRightIcon,
  CheckCircleIcon,
  Cog6ToothIcon,
  FolderIcon,
  HomeIcon,
  RectangleStackIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Button } from '@/src/shared/ui'

const navigation = [
  { id: 'overview', label: 'Обзор', icon: HomeIcon, href: '/' },
  { id: 'tasks', label: 'Мои задачи', icon: CheckCircleIcon, href: '/tasks' },
  {
    id: 'spaces',
    label: 'Пространства',
    icon: FolderIcon,
    href: '/spaces/website',
  },
  {
    id: 'messages',
    label: 'Сообщения',
    icon: ChatBubbleLeftRightIcon,
    href: '/messages',
  },
  {
    id: 'settings',
    label: 'Настройки',
    icon: Cog6ToothIcon,
    href: '/settings',
  },
]

export const AppSidebar = () => {
  const pathname = usePathname()

  return (
    <aside className="flex min-h-full flex-col border-r border-border px-6 py-[34px] max-[860px]:hidden">
      <div className="flex items-center gap-3 px-2 text-[25px] font-extrabold tracking-[-0.04em]">
        <span className="grid size-10 place-items-center rounded-xl bg-primary-500 text-primary-0 shadow-lg shadow-primary-200">
          <RectangleStackIcon className="size-6" />
        </span>
        Planqora
      </div>

      <nav className="mt-[66px] grid gap-2.5" aria-label="Основная навигация">
        {navigation.map(({ href, icon: Icon, label }) => {
          const isActive =
            href === '/'
              ? pathname === '/'
              : href !== '#' &&
                pathname.startsWith(href.split('/').slice(0, 2).join('/'))

          return (
            <Button
              asChild
              className={
                isActive
                  ? 'w-full justify-start bg-surface-subtle text-secondary-500'
                  : 'w-full justify-start'
              }
              key={label}
              size="lg"
              variant="minimal"
            >
              <Link href={href} prefetch>
                <Icon />
                {label}
              </Link>
            </Button>
          )
        })}
      </nav>
    </aside>
  )
}
