import * as Yup from 'yup'

export const loginSchema = Yup.object({
  email: Yup.string().email('Valid email required').required('Email is required'),
  password: Yup.string().required('Password is required'),
})

export type LoginFormValues = Yup.InferType<typeof loginSchema>

export const signupSchema = Yup.object({
  full_name: Yup.string().required('Full name is required'),
  email: Yup.string().email('Valid email required').required('Email is required'),
  password: Yup.string().required('Password is required'),
})

export type SignupFormValues = Yup.InferType<typeof signupSchema>
