'use client'

import { useState } from 'react'

import { Button } from '@/src/shared/ui'

import { SelectField } from './select-field'

export function GeneralSettings() {
  const [timeFormat, setTimeFormat] = useState<'12' | '24'>('24')

  return (
    <div className="flex max-w-[510px] flex-col pt-9 max-[860px]:min-h-[calc(100vh-352px)] max-[860px]:max-w-none max-[860px]:rounded-2xl max-[860px]:bg-primary-0 max-[860px]:p-7 max-[480px]:p-5">
      <div className="space-y-8">
        <SelectField label="Язык">
          <option>Русский</option>
          <option>English</option>
        </SelectField>
        <SelectField label="Часовой пояс">
          <option>Москва (UTC+3)</option>
          <option>Лондон (UTC+0)</option>
          <option>Нью-Йорк (UTC−5)</option>
        </SelectField>

        <fieldset>
          <legend className="mb-3 text-sm font-bold text-secondary-500">
            Формат времени
          </legend>
          <div className="grid grid-cols-2 gap-4">
            {(['24', '12'] as const).map((format) => {
              const checked = timeFormat === format
              return (
                <label
                  className={`flex h-14 cursor-pointer items-center justify-between rounded-xl border px-5 text-sm transition max-[420px]:px-3 ${checked ? 'border-primary-500 ring-1 ring-primary-500' : 'border-border'}`}
                  key={format}
                >
                  <span>{format} часа</span>
                  <input
                    checked={checked}
                    className="sr-only"
                    name="time-format"
                    onChange={() => setTimeFormat(format)}
                    type="radio"
                  />
                  <span
                    className={`grid size-6 shrink-0 place-items-center rounded-full border-2 ${checked ? 'border-primary-500' : 'border-border'}`}
                  >
                    {checked && (
                      <span className="size-3 rounded-full bg-primary-500" />
                    )}
                  </span>
                </label>
              )
            })}
          </div>
        </fieldset>
      </div>

      <Button
        className="mt-12 w-[275px] max-w-full max-[860px]:mt-auto max-[860px]:w-full"
        size="lg"
      >
        Сохранить изменения
      </Button>
    </div>
  )
}
