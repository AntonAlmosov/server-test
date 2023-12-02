'use client'
import { cn } from '@/lib/utils'
import { InputField, InputFieldProps } from './input-field'
import { Switch } from './ui/switch'
import { FieldValues, useFormContext } from 'react-hook-form'
import { FormLabel } from './ui/form'
import { ReactNode, useRef } from 'react'

interface TogglableInputFieldProps<T extends FieldValues>
  extends InputFieldProps<T> {
  switchDescription: string
}
type TogglableInputFieldFC = <T extends FieldValues>(
  props: TogglableInputFieldProps<T>,
) => ReactNode

export const TogglableInputField: TogglableInputFieldFC = ({
  name,
  className,
  switchDescription,
  ...rest
}) => {
  const { watch, setValue } = useFormContext()
  const value = watch(name)
  const ref = useRef<HTMLInputElement>(null)

  const handleInputToggle = (active: boolean) => {
    if (active) {
      setValue(name, '' as any)
      ref.current?.focus()
    } else {
      setValue(name, undefined as any)
    }
  }

  return (
    <section className={cn('flex flex-col gap-4', className)}>
      <section className="flex items-center gap-2">
        <Switch
          checked={value !== undefined}
          onCheckedChange={handleInputToggle}
        />

        <FormLabel>{switchDescription}</FormLabel>
      </section>
      {value !== undefined && (
        <InputField inputRef={ref} name={name} {...rest} />
      )}
    </section>
  )
}
