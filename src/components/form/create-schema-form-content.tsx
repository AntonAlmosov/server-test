'use client'
import { FC } from 'react'
import { InputField } from '@/components/input-field'
import { useFormContext } from 'react-hook-form'
import { SwitchField } from '@/components/switch-field'
import { camelCase } from '@/lib/case-transform'
import { SchemaFormActionType, SchemaType } from '@/lib/schemas/schema'
import { TextareaField } from '../textarea-field'

interface InitializeDataSchemaProps extends SchemaFormActionType {}

export const CreateSchemaFormContent: FC<InitializeDataSchemaProps> = ({
  action,
}) => {
  const { setValue } = useFormContext<SchemaType>()

  const enforceCamelCase = (e: string) => {
    if (action === 'create') {
      setValue(`dbName`, camelCase(e).replace(' ', ''))
    }
  }
  return (
    <>
      <InputField<SchemaType>
        onChange={enforceCamelCase}
        name="name"
        label="Name"
      />
      <InputField<SchemaType>
        name="dbName"
        label="DB Name"
        description="Please use camelCase"
        onBlur={enforceCamelCase}
        disabled={action === 'update'}
      />
      <SwitchField<SchemaType> name="singleton" label="Singleton" />
      <TextareaField<SchemaType>
        name="description"
        label="Description"
        description="Future you will be grateful"
      />
    </>
  )
}
