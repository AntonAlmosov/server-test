'use client'
import { Form } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FC, HTMLAttributes, useCallback } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { signIn } from 'next-auth/react'
import {
  AuthFormType,
  AuthInput,
  authFormDefaultValues,
} from '@/lib/schemas/auth'
import { routes } from '@/lib/routes'
import { AuthForm } from '../../components/auth-form'

interface SignUpFormProps
  extends Omit<HTMLAttributes<HTMLFormElement>, 'children'> {}

export const SignInForm: FC<SignUpFormProps> = ({ className, ...props }) => {
  const form = useForm<AuthFormType>({
    mode: 'onChange',
    resolver: zodResolver(AuthInput),
    defaultValues: authFormDefaultValues,
  })

  const onSubmit: SubmitHandler<AuthFormType> = useCallback(({ password }) => {
    signIn('credentials', { password, callbackUrl: routes.onboarding.index })
  }, [])

  return (
    <Form {...form}>
      <AuthForm
        heading="Sign In"
        onSubmit={onSubmit as any}
        description="You can update your password through dotenv"
        {...props}
      />
    </Form>
  )
}
