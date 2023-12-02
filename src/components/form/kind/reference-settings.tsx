import { FC } from 'react'
import { ToggleGroupField } from '@/components/toggle-group-field'
import { ToggleGroupItem } from '@/components/ui/toggle-group'
import { FormLabel } from '@/components/ui/form'
import { SchemaFieldType } from '@/lib/schemas/schema'

interface ReferenceMediaSettingsProps {}
export const ReferenceMediaSettings: FC<ReferenceMediaSettingsProps> = () => {
  return (
    <>
      <ToggleGroupField<
        SchemaFieldType,
        string & string[],
        { kind: string; options?: string[] }
      >
        type="single"
        variant="outline"
        gap="xl"
        name="controls.kind"
        className="justify-start"
        label="Control"
        defaultValue="control"
        transform={{
          input: (value) => value?.kind as string & string[],
          output: (value) => ({ kind: value }),
        }}
      >
        <ToggleGroupItem value="single">
          <FormLabel>Single</FormLabel>
        </ToggleGroupItem>
        <ToggleGroupItem value="multiple">
          <FormLabel>Multiple</FormLabel>
        </ToggleGroupItem>
      </ToggleGroupField>
    </>
  )
}
