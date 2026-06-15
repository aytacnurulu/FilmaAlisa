'use client'

import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useRouter } from 'next/navigation'
import { loginSchema, LoginFormValues } from '@/lib/validation'

const initialValues: LoginFormValues = { email: '', password: '' }

export default function LoginPage() {
  const router = useRouter()

  async function handleSubmit(
    values: LoginFormValues,
    { setStatus }: { setStatus: (msg: string) => void }
  ) {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    })

    if (!res.ok) {
      const { error } = await res.json()
      setStatus(error ?? 'Login failed')
      return
    }

    router.push('/')
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={loginSchema}
      onSubmit={handleSubmit}
    >
      {({ status, isSubmitting }) => (
        <Form>
          {status && <p style={{ color: 'red' }}>{status}</p>}

          <Field type="email" name="email" placeholder="Email" />
          <ErrorMessage name="email" component="p" />

          <Field type="password" name="password" placeholder="Password" />
          <ErrorMessage name="password" component="p" />

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Signing in…' : 'Sign in'}
          </button>
        </Form>
      )}
    </Formik>
  )
}
