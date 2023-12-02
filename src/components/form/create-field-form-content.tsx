'use client'

import { FC } from 'react'
import { InputField } from '@/components/input-field'
import { useFormContext } from 'react-hook-form'
import { camelCase } from '@/lib/case-transform'
import { SchemaFieldType, SchemaFormActionType } from '@/lib/schemas/schema'
import { SchemaKindField } from '../schema-kind-field'
import { SwitchField } from '../switch-field'
import { cn } from '@/lib/utils'

interface CreateFieldFormContentProps extends SchemaFormActionType {}

export const CreateFieldFormContent: FC<CreateFieldFormContentProps> = ({
  action,
}) => {
  const { setValue } = useFormContext<SchemaFieldType>()
  const enforceCamelCase = (e: string) => {
    if (action === 'create') {
      setValue(`dbName`, camelCase(e).replace(' ', ''))
    }
  }
  return (
    <>
      <SwitchField<SchemaFieldType>
        name={`required`}
        label={'Required field'}
      />
      <InputField<SchemaFieldType>
        onChange={enforceCamelCase}
        name="name"
        label="Name"
        required
      />
      <InputField<SchemaFieldType>
        required
        onBlur={enforceCamelCase}
        name="dbName"
        label="DBName"
        description="Please use camelCase"
        containerClassName={cn(action === 'update' ? 'hidden' : 'block')}
      />
      <SchemaKindField<SchemaFieldType>
        containerClassName={cn(action === 'update' ? 'hidden' : 'block')}
        name="kind"
        rules={{ required: true }}
      />
    </>
  )
}
