'use client'
import { ReactNode } from 'react'
import { Switch } from './ui/switch'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import {
  useFormContext,
  FieldValues,
  UseControllerProps,
  FieldPath,
} from 'react-hook-form'

interface SwtichFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends UseControllerProps<TFieldValues, TName> {
  label?: string
  onChange?: (value: boolean) => void
}

type SwitchFieldFC = <T extends FieldValues>(
  props: SwtichFieldProps<T>,
) => ReactNode

export const SwitchField: SwitchFieldFC = ({
  name,
  label,
  onChange,
  ...rest
}) => {
  const { control } = useFormContext()
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <span className="flex items-center gap-2">
              <Switch
                onCheckedChange={(e) => {
                  field.onChange(e)
                  onChange?.(e)
                }}
                {...field}
                {...rest}
                id={name}
              />
              {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
            </span>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
