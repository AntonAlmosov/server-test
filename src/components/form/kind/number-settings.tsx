import { FC } from 'react'
import { TogglableInputField } from '@/components/togglable-input-field'
import { SchemaFieldType } from '@/lib/schemas/schema'

interface NumberSetUpFormContentProps {}

export const NumberSettings: FC<NumberSetUpFormContentProps> = ({}) => {
  return (
    <>
      <TogglableInputField<SchemaFieldType>
        name={`filters.min`}
        switchDescription="Minimum value"
        type="number"
        placeholder="0"
      />
      <TogglableInputField
        name={`filters.max`}
        switchDescription="Maximum value"
        type="number"
        placeholder="128"
      />
    </>
  )
}
