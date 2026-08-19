import { ChevronDownIcon } from '@heroicons/react/24/outline'
import type { ReactNode } from 'react'

export function SelectField({
  children,
  label,
}: {
  children: ReactNode
  label: string
}) {
  return (
    <label className="block">
      <span className="mb-3 block text-sm font-bold text-secondary-500">
        {label}
      </span>
      <span className="relative block">
        <select className="h-14 w-full appearance-none rounded-xl border border-border bg-primary-0 px-5 pr-12 text-sm text-secondary-500 outline-none transition focus:border-primary-500 focus:ring-4 focus:ring-primary-100">
          {children}
        </select>
        <ChevronDownIcon className="pointer-events-none absolute right-5 top-1/2 size-5 -translate-y-1/2 text-secondary-500" />
      </span>
    </label>
  )
}
