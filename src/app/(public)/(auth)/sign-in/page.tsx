import { api } from '@/trpc/server'
import { SignInForm } from './components/sign-in-form'
import { routes } from '@/lib/routes'
import { redirect } from 'next/navigation'

export default async function Home() {
  const session = await api.auth.getSession.query()
  if (session) {
    redirect(routes.onboarding.index)
  }
  return <SignInForm />
}
