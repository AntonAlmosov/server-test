import { FC } from 'react'
import { TogglableInputField } from '@/components/togglable-input-field'
import { SchemaFieldType } from '@/lib/schemas/schema'

interface StringSettingsProps {}

export const StringSettings: FC<StringSettingsProps> = () => {
  return (
    <>
      <TogglableInputField<SchemaFieldType>
        name={`filters.max`}
        switchDescription="Limit character count"
        label="Character count"
        type="number"
        placeholder="128"
      />
      <TogglableInputField<SchemaFieldType>
        name={`filters.regexp`}
        switchDescription="Match regexp"
        label="Regexp"
        placeholder="/a-z/g"
      />
    </>
  )
}
