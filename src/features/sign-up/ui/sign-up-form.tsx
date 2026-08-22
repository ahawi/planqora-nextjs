'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

import { cn } from '@/src/shared/lib'
import { authClient } from '@/src/shared/lib/auth-client'
import { Button } from '@/src/shared/ui'

import { signUpSchema } from '../model/sign-up-schema'
import { type SignUpInput } from '../model/types'

const controlClassName =
  'h-12 w-full rounded-xl border-2 border-primary-200 bg-primary-0 px-4 text-sm font-medium text-secondary-500 outline-none transition-colors placeholder:text-secondary-300 hover:border-secondary-300 focus:border-primary-500 focus:ring-4 focus:ring-primary-100'

const invalidControlClassName =
  'border-error-400 hover:border-error-500 focus:border-error-500 focus:ring-error-100'

export const SignUpForm = () => {
  const {
    formState: { errors, isSubmitting },
    register,
    handleSubmit,
    setError,
  } = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const router = useRouter()

  const handleSignUp = async (data: SignUpInput) => {
    const { error } = await authClient.signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
    })

    if (error) {
      setError('root.server', {
        type: 'server',
        message: error.message || 'Не удалось зарегистрироваться',
      })
      return
    }

    router.push('/')
    router.refresh()
  }

  return (
    <section className="w-full max-w-md rounded-3xl border border-border bg-primary-0 p-8 shadow-sm max-[480px]:rounded-2xl max-[480px]:p-5">
      <div className="mb-8 text-center">
        <p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-primary-500">
          Planqora
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-secondary-500">
          Создать аккаунт
        </h1>
        <p className="mt-3 text-sm leading-6 text-secondary-400">
          Зарегистрируйтесь, чтобы управлять задачами и рабочими пространствами.
        </p>
      </div>

      <form
        className="grid gap-5"
        noValidate
        onSubmit={handleSubmit(handleSignUp)}
      >
        <label className="grid gap-2" htmlFor="sign-up-name">
          <span className="text-sm font-bold text-secondary-500">Имя</span>
          <input
            {...register('name')}
            aria-describedby={errors.name ? 'sign-up-name-error' : undefined}
            aria-invalid={Boolean(errors.name)}
            aria-required="true"
            autoComplete="name"
            className={cn(
              controlClassName,
              errors.name && invalidControlClassName,
            )}
            id="sign-up-name"
            placeholder="Ваше имя"
            type="text"
          />
          {errors.name && (
            <span
              className="text-xs font-medium text-error-600"
              id="sign-up-name-error"
              role="alert"
            >
              {errors.name.message}
            </span>
          )}
        </label>

        <label className="grid gap-2" htmlFor="sign-up-email">
          <span className="text-sm font-bold text-secondary-500">Email</span>
          <input
            {...register('email')}
            aria-describedby={errors.email ? 'sign-up-email-error' : undefined}
            aria-invalid={Boolean(errors.email)}
            aria-required="true"
            autoComplete="email"
            className={cn(
              controlClassName,
              errors.email && invalidControlClassName,
            )}
            id="sign-up-email"
            placeholder="name@example.com"
            type="email"
          />
          {errors.email && (
            <span
              className="text-xs font-medium text-error-600"
              id="sign-up-email-error"
              role="alert"
            >
              {errors.email.message}
            </span>
          )}
        </label>

        <label className="grid gap-2" htmlFor="sign-up-password">
          <span className="text-sm font-bold text-secondary-500">Пароль</span>
          <input
            {...register('password')}
            aria-describedby={
              errors.password ? 'sign-up-password-error' : undefined
            }
            aria-invalid={Boolean(errors.password)}
            aria-required="true"
            autoComplete="new-password"
            className={cn(
              controlClassName,
              errors.password && invalidControlClassName,
            )}
            id="sign-up-password"
            placeholder="Минимум 8 символов"
            type="password"
          />
          {errors.password && (
            <span
              className="text-xs font-medium text-error-600"
              id="sign-up-password-error"
              role="alert"
            >
              {errors.password.message}
            </span>
          )}
        </label>

        <label className="grid gap-2" htmlFor="sign-up-confirm-password">
          <span className="text-sm font-bold text-secondary-500">
            Повторите пароль
          </span>
          <input
            {...register('confirmPassword')}
            aria-describedby={
              errors.confirmPassword
                ? 'sign-up-confirm-password-error'
                : undefined
            }
            aria-invalid={Boolean(errors.confirmPassword)}
            aria-required="true"
            autoComplete="new-password"
            className={cn(
              controlClassName,
              errors.confirmPassword && invalidControlClassName,
            )}
            id="sign-up-confirm-password"
            placeholder="Введите пароль ещё раз"
            type="password"
          />
          {errors.confirmPassword && (
            <span
              className="text-xs font-medium text-error-600"
              id="sign-up-confirm-password-error"
              role="alert"
            >
              {errors.confirmPassword.message}
            </span>
          )}
        </label>

        {errors.root?.server && (
          <p
            className="rounded-xl border border-error-200 bg-error-100 px-4 py-3 text-sm font-medium text-error-700"
            role="alert"
          >
            {errors.root.server.message}
          </p>
        )}

        <Button
          className="mt-2 w-full"
          size="lg"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Регистрация...' : 'Зарегистрироваться'}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-secondary-400">
        Уже есть аккаунт?{' '}
        <Link
          className="font-bold text-primary-500 hover:text-primary-600 focus-visible:rounded focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-100"
          href="/sign-in"
        >
          Войти
        </Link>
      </p>
    </section>
  )
}
