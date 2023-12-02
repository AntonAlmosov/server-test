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
import { Schema, SchemaType } from '@/lib/schemas/schema'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CreateSchemaFormContent } from '@/components/form/create-schema-form-content'
import { api } from '@/trpc/react'
import { useOnboardingFieldFormState } from '../lib/onboarding-field-form-state'

const PartialSchema = Schema.pick({
  name: true,
  dbName: true,
  singleton: true,
})

export const OnboardingCreateFieldForm = () => {
  const methods = useForm<SchemaType>({
    resolver: zodResolver(PartialSchema),
  })
  const { push } = useRouter()
  const setDbName = useOnboardingFieldFormState((state) => state.setDbName)
  const dbName = methods.watch('dbName')
  const createSchemaMutation = api.schema.create.useMutation({
    onSuccess: () => {
      setDbName(dbName)
      push(onboardngRoutes[1])
    },
  })

  const onSubmit: SubmitHandler<SchemaType> = useCallback(
    (values) => {
      createSchemaMutation.mutate(values)
    },
    [createSchemaMutation],
  )

  return (
    <Form {...methods}>
      <form className="col-center" onSubmit={methods.handleSubmit(onSubmit)}>
        <CardHeader className="px-0">
          <CardTitle>Create a Schema</CardTitle>
          <CardDescription>
            Schema are building blocks of Esque Editor
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 px-0">
          <CreateSchemaFormContent action="create" />
        </CardContent>
        <CardFooter className="flex gap-4 px-0">
          <Button type="submit" className="flex-grow">
            Continue
          </Button>
        </CardFooter>
      </form>
    </Form>
  )
}
