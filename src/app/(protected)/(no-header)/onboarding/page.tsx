import { routes } from '@/lib/routes'
import { redirect } from 'next/navigation'

export default async function OnboardingPage() {
  redirect(routes.onboarding['create-schema'])
}
