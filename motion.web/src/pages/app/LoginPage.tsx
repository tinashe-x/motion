import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MotionLogo } from '@/components/MotionLogo'
import { AuthSplitLayout } from '@/layouts/AuthSplitLayout'
import { useAppState } from '@/context/AppState'

export function LoginPage() {
  const { login } = useAppState()
  const navigate = useNavigate()
  const [email, setEmail] = useState('thandi@motion.app')
  const [password, setPassword] = useState('password')

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    login(email)
    navigate('/app/home')
  }

  return (
    <AuthSplitLayout>
      <div className="app-shell flex min-h-dvh flex-col py-8 md:py-10 lg:py-14">
        <div className="flex items-center justify-between md:hidden">
          <MotionLogo size="lg" />
          <Link to="/app/signup" className="text-sm font-semibold text-accent">
            Sign Up
          </Link>
        </div>
        <div className="hidden items-center justify-end md:flex">
          <Link to="/app/signup" className="text-sm font-semibold text-accent">
            Create account
          </Link>
        </div>
        <div className="mx-auto flex w-full max-w-lg flex-1 flex-col justify-center md:max-w-xl">
          <h1 className="font-heading text-3xl font-bold md:text-4xl">Welcome back</h1>
          <p className="mt-2 text-sm text-muted md:text-base">
            Log in to see tonight&apos;s vibe.
          </p>
          <form onSubmit={onSubmit} className="mt-8 space-y-4 md:mt-10">
            <label className="block text-sm">
              <span className="mb-1.5 block text-muted">Email</span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="min-h-11 w-full rounded-xl border border-white/10 bg-surface-2 px-3 outline-none ring-primary focus:ring-2 md:min-h-12 md:px-4"
              />
            </label>
            <label className="block text-sm">
              <span className="mb-1.5 block text-muted">Password</span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="min-h-11 w-full rounded-xl border border-white/10 bg-surface-2 px-3 outline-none ring-primary focus:ring-2 md:min-h-12 md:px-4"
              />
            </label>
            <button type="button" className="text-sm text-muted hover:text-accent">
              Forgot password
            </button>
            <button
              type="submit"
              className="min-h-11 w-full rounded-full gradient-brand text-sm font-semibold md:min-h-12 md:text-base"
            >
              Log In
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-muted md:mt-8">
            New here?{' '}
            <Link to="/app/signup" className="font-semibold text-accent">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </AuthSplitLayout>
  )
}
