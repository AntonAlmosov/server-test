import { create } from 'zustand'
import { DefaultValues } from 'react-hook-form'
import { persist, createJSONStorage } from 'zustand/middleware'
import { SchemaFieldType } from '@/lib/schemas/schema'

interface OnboardingFieldFormStateInterface {
  dbName?: string
  setDbName: (value: string) => void
  formState: DefaultValues<SchemaFieldType>
  setFormState: (formState: SchemaFieldType) => void
  resetState: () => void
}

export const useOnboardingFieldFormState = create(
  persist<OnboardingFieldFormStateInterface>(
    (set) => ({
      formState: {},
      setDbName: (dbName) => set({ dbName }),
      setFormState: (formState) => set({ formState }),
      resetState: () => set({ formState: {} }),
    }),
    {
      name: 'onboarding-store',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)
