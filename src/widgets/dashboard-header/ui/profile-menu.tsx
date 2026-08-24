'use client'

import { useEffect, useRef, useState } from 'react'

import { SignOutButton } from '@/src/features/sign-out'
import { Button } from '@/src/shared/ui'

interface ProfileMenuProps {
  userName: string
}

export const ProfileMenu = ({ userName }: ProfileMenuProps) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const userInitial = userName.trim().toUpperCase()[0]

  const handleMenuOpen = () => {
    setMenuOpen((currentState) => !currentState)
  }

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeydown)

    return () => document.removeEventListener('keydown', handleKeydown)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={menuRef}>
      <Button
        aria-controls="profile-menu"
        aria-expanded={menuOpen}
        aria-haspopup="menu"
        aria-label={`Профиль ${userName}`}
        className="rounded-full bg-gradient-to-br from-warning-300 to-secondary-400 text-primary-0 max-[520px]:size-9"
        iconOnly
        variant="minimal"
        onClick={handleMenuOpen}
      >
        {userInitial}
      </Button>

      {menuOpen && (
        <div
          className="absolute right-0 top-full z-20 mt-2 w-64 rounded-2xl border border-secondary-200 bg-primary-0 p-3 shadow-lg"
          id="profile-menu"
          role="menu"
        >
          <div className="mb-2 border-b border-secondary-200 px-3 pb-3 pt-1">
            <p className="text-xs text-secondary-500">Вы вошли как</p>
            <p className="truncate text-sm font-semibold text-secondary-900">
              {userName}
            </p>
          </div>
          <SignOutButton />
        </div>
      )}
    </div>
  )
}
