'use client'

import { FC } from 'react'
import { ToggleGroupField } from '@/components/toggle-group-field'
import { ToggleGroupItem } from '@/components/ui/toggle-group'
import { FormLabel } from '@/components/ui/form'
import { useFormContext } from 'react-hook-form'
import { InputField } from '@/components/input-field'
import { SchemaFieldType } from '@/lib/schemas/schema'

interface BooleanSettingsProps {}

export const BooleanSettings: FC<BooleanSettingsProps> = () => {
  const { watch } = useFormContext()
  const controls = watch(`controls`)
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
        name={`controls.kind`}
        className="justify-start"
        label="Control"
        defaultValue="control"
        transform={{
          input: (value) => value?.kind as string & string[],
          output: (value) => ({ kind: value }),
        }}
      >
        <ToggleGroupItem value="switch">
          <FormLabel className="pointer">Switch</FormLabel>
        </ToggleGroupItem>
        <ToggleGroupItem value="radio">
          <FormLabel className="pointer">Radio</FormLabel>
        </ToggleGroupItem>
      </ToggleGroupField>
      {controls?.kind === 'radio' && (
        <section className="flex justify-start gap-4">
          <InputField
            required
            name={`controls.options.0`}
            label="Left Option"
          />
          <InputField
            required
            name={`controls.options.1`}
            label="Right Option"
          />
        </section>
      )}
    </>
  )
}
