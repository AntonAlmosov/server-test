'use client'

import { FC, HTMLAttributes } from 'react'
import { SubmitHandler, useFormContext } from 'react-hook-form'
import { AuthFormType } from '@/lib/schemas/auth'
import { Button } from '@/components/ui/button'
import { InputField } from '@/components/input-field'
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface AuthFormProps
  extends Omit<HTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  heading: string
  description?: string
  onSubmit: SubmitHandler<AuthFormType>
}

export const AuthForm: FC<AuthFormProps> = ({
  className,
  description,
  heading,
  onSubmit,
  ...props
}) => {
  const { formState, handleSubmit } = useFormContext<AuthFormType>()
  return (
    <form
      className={cn('col-center', className)}
      onSubmit={handleSubmit(onSubmit)}
      {...props}
    >
      <CardHeader className="px-0">
        <CardTitle>{heading}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 px-0">
        <InputField
          name="password"
          label="Password"
          placeholder="•••••••"
          type="password"
        />
      </CardContent>
      <CardFooter className="px-0">
        <Button disabled={formState.isValid === false} type="submit">
          Submit
        </Button>
      </CardFooter>
    </form>
  )
}
