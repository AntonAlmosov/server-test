'use client'
import { CreateSchemaFormContent } from '@/components/form/create-schema-form-content'
import { SubmitButton } from '@/components/submit-button'
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Form } from '@/components/ui/form'
import { Schema, SchemaFormActionType, SchemaType } from '@/lib/schemas/schema'
import { DbNameType } from '@/lib/schemas/schema'
import { cn } from '@/lib/utils'
import { api } from '@/trpc/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { FC, HTMLAttributes, ReactNode, useCallback, useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

interface SchemaForm
  extends Omit<HTMLAttributes<HTMLFormElement>, 'onSubmit'>,
    Partial<DbNameType>,
    SchemaFormActionType {
  button?: (children: ReactNode) => ReactNode
}

const PartialSchema = Schema.pick({
  name: true,
  dbName: true,
  singleton: true,
})

export const SchemaForm: FC<SchemaForm> = ({
  action,
  className,
  dbName,
  button,
  ...props
}) => {
  const { data: defaultValues } = api.schema.find.useQuery(
    {
      dbName: dbName ?? '',
      kind: 'tmp',
    },
    { enabled: !!dbName },
  )
  const methods = useForm<SchemaType>({
    resolver: zodResolver(PartialSchema),
    defaultValues: { singleton: false },
  })
  const name = methods.watch('name')

  useEffect(() => {
    if (defaultValues) {
      methods.reset(defaultValues)
    }
  }, [methods, defaultValues])

  const createSchemaMutation = api.schema.create.useMutation()
  const updateSchemaMutation = api.schema.update.useMutation()

  const onSubmit: SubmitHandler<SchemaType> = useCallback(
    (value) => {
      if (action === 'update') {
        updateSchemaMutation.mutate(value)
      } else {
        createSchemaMutation.mutate(value)
      }
    },
    [action, createSchemaMutation, updateSchemaMutation],
  )

  return (
    <Form {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className={cn('@container/form flex flex-col gap-4', className)}
        {...props}
      >
        <CardHeader className="px-0">
          <CardTitle>
            {action === 'update' ? `Edit schema ${name}` : 'Create a Schema'}
          </CardTitle>
          <CardDescription>
            Schemas are building blocks of Esque Editor
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 px-0">
          <CreateSchemaFormContent action={action} />
        </CardContent>
        <CardFooter className="px-0">
          {button ? (
            button(
              <SubmitButton
                disabled={!methods.formState.isValid}
                action={action}
              />,
            )
          ) : (
            <SubmitButton
              disabled={!methods.formState.isValid}
              action={action}
            />
          )}
        </CardFooter>
      </form>
    </Form>
  )
}
