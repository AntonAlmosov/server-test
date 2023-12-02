import { redirect } from 'next/navigation'
import { SignUpForm } from './components/sign-up-form'
import { env } from '@/env.mjs'
import { routes } from '@/lib/routes'

export default async function Home() {
  if (env.NEXT_PASSWORD) {
    redirect(routes['sign-in'])
  }
  return <SignUpForm />
}
