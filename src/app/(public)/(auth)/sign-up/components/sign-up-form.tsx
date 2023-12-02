'use client'
import { Form } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FC, HTMLAttributes, useCallback } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { api } from '@/trpc/react'
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

export const SignUpForm: FC<SignUpFormProps> = ({ className, ...props }) => {
  const form = useForm<AuthFormType>({
    mode: 'onChange',
    resolver: zodResolver(AuthInput),
    defaultValues: authFormDefaultValues,
  })
  const mutation = api.auth.signUp.useMutation({
    onError: (err) => {
      console.error(err)
      form.setError('password', { message: err.message })
    },
    onSuccess: (_, { password }) => {
      signIn('credentials', { password, callbackUrl: routes.onboarding.index })
    },
  })

  const onSubmit: SubmitHandler<AuthFormType> = useCallback(
    (value) => {
      mutation.mutate(value)
    },
    [mutation],
  )

  return (
    <Form {...form}>
      <AuthForm
        heading="Sign Up"
        onSubmit={onSubmit as any}
        description="Make sure password contains letters, numbers and special characters (like $#&...)"
        {...props}
      />
    </Form>
  )
}
