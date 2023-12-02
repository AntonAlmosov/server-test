'use client'
import { SetUpFieldFormContent } from '@/components/form/set-up-field-form-content'
import { Button } from '@/components/ui/button'
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Form } from '@/components/ui/form'
import { onboardngRoutes, routes } from '@/lib/routes'
import { SchemaField, SchemaFieldType } from '@/lib/schemas/schema'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useOnboardingFieldFormState } from '../lib/onboarding-field-form-state'
import { api } from '@/trpc/react'

export const OnboardingSetUpFieldForm = () => {
  const schemaDbName =
    useOnboardingFieldFormState((state) => state.dbName) ?? ''
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

  const createFieldMutation = api.schema.fields.create.useMutation({
    onSuccess: () => {
      push(routes.schema.index)
    },
  })

  const onSubmit: SubmitHandler<SchemaFieldType> = useCallback(
    (values) => {
      createFieldMutation.mutate({
        ...values,
        schemaDbName,
      })
    },
    [createFieldMutation, schemaDbName],
  )

  const goBack = useCallback(() => {
    persistValues(formValues)
    push(onboardngRoutes[1])
  }, [persistValues, formValues, push])

  return (
    <Form {...methods}>
      <form className="col-center" onSubmit={methods.handleSubmit(onSubmit)}>
        <CardHeader className="px-0">
          <CardTitle>{`Set-up field ${formValues.name}`}</CardTitle>
          <CardDescription>Fields could be further specified</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 px-0">
          <SetUpFieldFormContent />
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
