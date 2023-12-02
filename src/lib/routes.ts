import { camelToDashCase } from './case-transform'

export const routes = {
  'sign-in': '/sign-in',
  'sign-up': '/sign-up',
  schema: {
    index: '/schema',
  },
  onboarding: {
    'create-schema': '/onboarding/create-schema',
    'add-field': '/onboarding/add-field',
    'set-up-field': '/onboarding/set-up-field',
    index: '/onboarding',
  },
}
export const schemaEditRoute = (dbName: string) =>
  `${routes.schema}/${camelToDashCase(dbName)}`

export const onboardngRoutes = [
  routes.onboarding['create-schema'],
  routes.onboarding['add-field'],
  routes.onboarding['set-up-field'],
]

export type OnboardingType = (typeof routes)['onboarding']
