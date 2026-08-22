import { SignUpForm } from '@/src/features/sign-up'

const SignUpPage = () => {
  return (
    <main className="relative grid h-dvh place-items-center overflow-y-auto bg-surface-page px-5 py-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -left-24 -top-24 size-72 rounded-full bg-primary-200/55 blur-3xl" />
        <div className="absolute -bottom-32 -right-20 size-80 rounded-full bg-primary-100/80 blur-3xl" />
      </div>

      <div className="relative z-10 flex w-full justify-center">
        <SignUpForm />
      </div>
    </main>
  )
}

export default SignUpPage
