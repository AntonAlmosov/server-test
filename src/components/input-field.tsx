'use client'
import { ForwardedRef, ReactNode, Ref, forwardRef } from 'react'
import { Input, InputProps } from './ui/input'
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
  UseControllerProps,
  FieldPath,
} from 'react-hook-form'

export interface InputFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<UseControllerProps<TFieldValues, TName>, 'rules'>,
    Omit<InputProps, 'name' | 'defaultValue'> {
  label?: string
  description?: string
  placeholder?: string
  containerClassName?: string
  onChange?: (value: any) => void
  onBlur?: (value: any) => void
}
type InputFieldInnerFC = <T extends FieldValues>(
  props: InputFieldProps<T>,
  ref: ForwardedRef<HTMLInputElement>,
) => ReactNode

const InputFieldInner: InputFieldInnerFC = (
  { name, label, description, placeholder, containerClassName, ...rest },
  ref,
) => {
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
            <Input
              {...field}
              onChange={(e) => {
                if (rest.type === 'number') {
                  field.onChange(+e.target.value)
                  rest.onChange?.(+e.target.value)
                } else {
                  field.onChange(e)
                  rest.onChange?.(e.target.value)
                }
              }}
              onBlur={(e) => {
                if (rest.type === 'number') {
                  field.onBlur()
                  rest.onBlur?.(+e.target.value)
                } else {
                  field.onBlur()
                  rest.onBlur?.(e.target.value)
                }
              }}
              type={rest.type}
              autoComplete="off"
              placeholder={placeholder}
              ref={ref}
              id={name}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

const InputFieldWithRef = forwardRef(InputFieldInner)

export type InputFieldWithRefProps<T extends FieldValues> =
  InputFieldProps<T> & { inputRef?: Ref<HTMLInputElement> }

type InputFieldFC = <T extends FieldValues>(
  props: InputFieldWithRefProps<T>,
  ref: ForwardedRef<HTMLInputElement>,
) => ReactNode
export const InputField: InputFieldFC = ({ inputRef, ...rest }) => (
  <InputFieldWithRef ref={inputRef} {...(rest as any)} />
)
