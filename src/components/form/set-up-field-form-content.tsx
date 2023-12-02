'use client'
import { FC, useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { InputField } from '@/components/input-field'
import { SchemaFieldType } from '@/lib/schemas/schema'
import { NumberSettings } from './kind/number-settings'
import { ReferenceMediaSettings } from './kind/reference-settings'
import { BooleanSettings } from './kind/boolean-settings'
import { StringSettings } from './kind/string-settings'

export const SetUpFieldFormContent: FC = () => {
  const { watch } = useFormContext<SchemaFieldType>()

  const kind = watch(`kind`)

  const content = useMemo(() => {
    switch (kind) {
      case 'number':
        return <NumberSettings />
      case 'media':
      case 'reference':
        return <ReferenceMediaSettings />
      case 'boolean':
        return <BooleanSettings />
      case 'string':
        return <StringSettings />
      default:
        return null
    }
  }, [kind])

  return (
    <>
      {content}
      <InputField<SchemaFieldType>
        name={`description`}
        label="Field description"
        placeholder="Important field"
      />
    </>
  )
}
