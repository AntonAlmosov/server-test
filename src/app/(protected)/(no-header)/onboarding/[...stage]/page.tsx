import { OnboardingType } from '@/lib/routes'
import { notFound } from 'next/navigation'
import { OnboardingSetUpFieldForm } from './components/onboarding-set-up-field-form'
import { OnboardingCreateSchemaForm } from './components/onboarding-create-field-form'
import { OnboardingCreateFieldForm } from './components/onboarding-create-schema-form'

export default async function Onboarding({
  params,
}: {
  params: { stage: Array<keyof OnboardingType> }
}) {
  switch (params.stage[0]) {
    case 'set-up-field':
      return <OnboardingSetUpFieldForm />
    case 'add-field':
      return <OnboardingCreateFieldForm />
    case 'create-schema':
      return <OnboardingCreateSchemaForm />
    default:
      notFound()
  }
}
