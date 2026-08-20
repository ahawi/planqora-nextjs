'use client'

import { useState } from 'react'

import { GeneralSettings } from './general-settings'
import { NotificationSettings } from './notification-settings'
import { SettingsHeader } from './settings-header'

type SettingsTab = 'general' | 'notifications'

export const SettingsPanel = () => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('general')

  return (
    <section className="flex h-full min-h-0 flex-col overflow-hidden bg-surface-muted">
      <SettingsHeader />
      <div className="min-h-0 flex-1 overflow-y-auto p-9 max-[860px]:p-0">
        <div className="min-h-[650px] rounded-[18px] bg-primary-0 px-10 py-10 max-[860px]:min-h-0 max-[860px]:rounded-none max-[860px]:px-0 max-[860px]:py-0">
          <div className="flex gap-7 border-b border-border max-[860px]:px-7">
            <button
              className={`border-b-2 px-3 pb-4 text-sm transition max-[860px]:pb-5 ${activeTab === 'general' ? 'border-primary-500 font-semibold text-secondary-500' : 'border-transparent text-secondary-300'}`}
              onClick={() => setActiveTab('general')}
              type="button"
            >
              Основные
            </button>
            <button
              className={`border-b-2 px-3 pb-4 text-sm transition max-[860px]:pb-5 ${activeTab === 'notifications' ? 'border-primary-500 font-semibold text-secondary-500' : 'border-transparent text-secondary-300'}`}
              onClick={() => setActiveTab('notifications')}
              type="button"
            >
              Уведомления
            </button>
          </div>
          <div className="max-[860px]:bg-surface-muted max-[860px]:p-7 max-[480px]:p-5">
            {activeTab === 'general' ? (
              <GeneralSettings />
            ) : (
              <NotificationSettings />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
