import * as z from 'zod'

const PASSWORD_REGEXP =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/

export const AuthInput = z.object({
  password: z
    .string()
    .min(8, { message: 'Minimum password length is 8 symbols' })
    .max(32, { message: 'Maximum password length is 32 symbols' })
    .refine((value) => PASSWORD_REGEXP.test(value), {
      message:
        'Please make sure that you used uppercase letters, numbers and symbols',
    }),
})

export type AuthFormType = z.infer<typeof AuthInput>

export const authFormDefaultValues: AuthFormType = {
  password: '',
}
