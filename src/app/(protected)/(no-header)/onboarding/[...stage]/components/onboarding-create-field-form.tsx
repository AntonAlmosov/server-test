'use client'
import { Button } from '@/components/ui/button'
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Form } from '@/components/ui/form'
import { onboardngRoutes } from '@/lib/routes'
import { SchemaField, SchemaFieldType } from '@/lib/schemas/schema'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CreateFieldFormContent } from '@/components/form/create-field-form-content'
import { useOnboardingFieldFormState } from '../lib/onboarding-field-form-state'

export const OnboardingCreateSchemaForm = () => {
  const persistValues = useOnboardingFieldFormState(
    (state) => state.setFormState,
  )
  const defaultValues = useOnboardingFieldFormState((state) => state.formState)
  const methods = useForm<SchemaFieldType>({
    defaultValues,
    resolver: zodResolver(SchemaField),
  })
  const { push } = useRouter()

  const formValues = methods.watch()

  const onSubmit: SubmitHandler<SchemaFieldType> = useCallback(() => {
    push(onboardngRoutes[2])
  }, [push])

  const goBack = useCallback(() => {
    persistValues(formValues)
    push(onboardngRoutes[0])
  }, [persistValues, formValues, push])

  return (
    <Form {...methods}>
      <form
        className="col-center @container/form"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <CardHeader className="px-0">
          <CardTitle>Create new Field</CardTitle>
          <CardDescription>
            Fields are the pieces of content you put together
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 px-0">
          <CreateFieldFormContent action="create" />
        </CardContent>
        <CardFooter className="flex gap-4 px-0">
          <Button onClick={goBack} variant="outline">
            Back
          </Button>
          <Button type="submit" className="flex-grow">
            Finish
          </Button>
        </CardFooter>
      </form>
    </Form>
  )
}
