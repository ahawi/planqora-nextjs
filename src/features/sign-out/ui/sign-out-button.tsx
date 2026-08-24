'use client'

import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { authClient } from '@/src/shared/lib/auth-client'
import { Button } from '@/src/shared/ui'

export const SignOutButton = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const router = useRouter()

  const handleClick = async () => {
    setErrorMessage(null)
    setIsLoading(true)

    try {
      const { error } = await authClient.signOut()

      if (error) {
        setErrorMessage(error.message || 'Не удалось выполнить выход')
        return
      }

      router.replace('/sign-in')
    } catch {
      setErrorMessage('Не удалось выполнить выход')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="grid gap-2">
      <Button
        className="w-full justify-start text-error-600 hover:bg-error-100 hover:text-error-700"
        disabled={isLoading}
        variant="minimal"
        onClick={handleClick}
      >
        <ArrowRightStartOnRectangleIcon />
        {isLoading ? 'Выход...' : 'Выйти'}
      </Button>
      {errorMessage && (
        <p className="px-3 text-xs font-medium text-error-600" role="alert">
          {errorMessage}
        </p>
      )}
    </div>
  )
}
