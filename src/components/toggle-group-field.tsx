'use client'
import { ReactNode } from 'react'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import {
  useFormContext,
  FieldValues,
  FieldPath,
  ControllerProps,
  RegisterOptions,
  Path,
} from 'react-hook-form'
import { ToggleGroup, ToggleGroupProps } from './ui/toggle-group'

export interface ToggleGroupFieldBaseProps<
  TInput extends string & string[] = string & string[],
  TOutput = any,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<ControllerProps<TFieldValues, TName>, 'rules' | 'render'>,
    Omit<ToggleGroupProps, 'name' | 'defaultValue'> {
  label?: string
  description?: string
  placeholder?: string
  transform?: {
    input: (value: TOutput) => TInput
    output: (value: TInput) => TOutput
  }
  containerClassName?: string
  rules?:
    | Omit<
        RegisterOptions<FieldValues, Path<TFieldValues>>,
        'disabled' | 'valueAsNumber' | 'valueAsDate' | 'setValueAs'
      >
    | undefined
}

export type ToggleGroupFC = <
  TFieldValues extends FieldValues,
  TInput extends string & string[],
  TOutput,
>(
  props: ToggleGroupFieldBaseProps<TInput, TOutput, TFieldValues>,
) => ReactNode

export const ToggleGroupField: ToggleGroupFC = ({
  name,
  label,
  description,
  placeholder,
  type,
  className,
  containerClassName,
  children,
  transform,
  ...rest
}) => {
  const { control } = useFormContext()
  return (
    <FormField
      {...rest}
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={containerClassName}>
          {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
          <FormControl>
            <ToggleGroup
              {...field}
              className={className}
              value={transform?.input(field.value) ?? field.value}
              onValueChange={(value: string & string[]) => {
                // @ts-ignore this error also occurs in official example https://codesandbox.io/s/transform-vt3tm
                const transformedValue = (transform?.output(value) ??
                  value) as string & string[]
                field.onChange(transformedValue)
                rest.onValueChange?.(transformedValue)
              }}
              variant={rest.variant}
              size={rest.size}
              gap={rest.gap}
              type={type}
            >
              {children}
            </ToggleGroup>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
