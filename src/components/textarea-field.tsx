'use client'
import { ForwardedRef, ReactNode, Ref, forwardRef } from 'react'
import { InputProps } from './ui/input'
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
import { Textarea } from './ui/textarea'

export interface TextareaFieldProps<
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
type TextareaFieldInnerFC = <T extends FieldValues>(
  props: TextareaFieldProps<T>,
  ref: ForwardedRef<HTMLInputElement>,
) => ReactNode

const TextareaFieldInner: TextareaFieldInnerFC = ({
  name,
  label,
  description,
  placeholder,
  containerClassName,
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
            <Textarea
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
              autoComplete="off"
              placeholder={placeholder}
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

const TextareaFieldWithRef = forwardRef(TextareaFieldInner)

export type TextareaFieldWithRefProps<T extends FieldValues> =
  TextareaFieldProps<T> & { inputRef?: Ref<HTMLInputElement> }

type TextareaFieldFC = <T extends FieldValues>(
  props: TextareaFieldWithRefProps<T>,
  ref: ForwardedRef<HTMLInputElement>,
) => ReactNode
export const TextareaField: TextareaFieldFC = ({ inputRef, ...rest }) => (
  <TextareaFieldWithRef ref={inputRef} {...(rest as any)} />
)
