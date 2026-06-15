'use client'

import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useRouter } from 'next/navigation'
import { signupSchema, SignupFormValues } from '@/lib/validation'

const initialValues: SignupFormValues = { full_name: '', email: '', password: '' }

export default function SignupPage() {
  const router = useRouter()

  async function handleSubmit(
    values: SignupFormValues,
    { setStatus }: { setStatus: (msg: string) => void }
  ) {
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    })

    if (!res.ok) {
      const { error } = await res.json()
      setStatus(error ?? 'Signup failed')
      return
    }

    router.push('/login')
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={signupSchema}
      onSubmit={handleSubmit}
    >
      {({ status, isSubmitting }) => (
        <Form>
          {status && <p style={{ color: 'red' }}>{status}</p>}

          <Field type="text" name="full_name" placeholder="Full name" />
          <ErrorMessage name="full_name" component="p" />

          <Field type="email" name="email" placeholder="Email" />
          <ErrorMessage name="email" component="p" />

          <Field type="password" name="password" placeholder="Password" />
          <ErrorMessage name="password" component="p" />

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Signing up…' : 'Sign up'}
          </button>
        </Form>
      )}
    </Formik>
  )
}
