'use client'

import { Formik, Form, Field, type FieldProps } from 'formik'
import { useRouter } from 'next/navigation'
import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { FiMail, FiLock } from 'react-icons/fi'
import { loginSchema, type LoginFormValues } from '@/lib/validation'
import { revealContainer, revealItem } from '@/shared/motion'
import { Logo } from '@/shared/ui/Logo'
import { Input } from '@/shared/ui/Input'
import { PasswordInput } from '@/shared/ui/PasswordInput'
import { Button } from '@/shared/ui/Button'

const initialValues: LoginFormValues = { email: '', password: '' }

export default function LoginPage() {
  const router = useRouter()
  const reduced = useReducedMotion()

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
    <div className="min-h-screen bg-bg flex items-center justify-center px-4 py-10">
      <Formik
        initialValues={initialValues}
        validationSchema={loginSchema}
        onSubmit={handleSubmit}
      >
        {({ status, isSubmitting }) => (
          <Form className="w-full max-w-sm">
            <motion.div
              variants={revealContainer}
              initial={reduced ? 'show' : 'hidden'}
              animate="show"
              className="bg-surface rounded-xl p-8 flex flex-col gap-5 shadow-card"
            >
              {/* Logo + wordmark */}
              <motion.div
                variants={revealItem}
                className="flex flex-col items-center gap-3 pb-2"
              >
                <Logo size="lg" withWordmark />
              </motion.div>

              {/* Server-side error */}
              {status && (
                <motion.p
                  key="login-error"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-danger text-center -mt-1"
                >
                  {status}
                </motion.p>
              )}

              {/* Email */}
              <motion.div variants={revealItem}>
                <Field name="email">
                  {({ field, meta }: FieldProps) => (
                    <Input
                      {...field}
                      type="email"
                      placeholder="Email address"
                      autoComplete="email"
                      leftIcon={<FiMail size={16} />}
                      error={meta.touched && meta.error ? meta.error : undefined}
                    />
                  )}
                </Field>
              </motion.div>

              {/* Password */}
              <motion.div variants={revealItem}>
                <Field name="password">
                  {({ field, meta }: FieldProps) => (
                    <PasswordInput
                      {...field}
                      placeholder="Password"
                      autoComplete="current-password"
                      leftIcon={<FiLock size={16} />}
                      error={meta.touched && meta.error ? meta.error : undefined}
                    />
                  )}
                </Field>
              </motion.div>

              {/* Submit */}
              <motion.div variants={revealItem} className="pt-1">
                <Button type="submit" fullWidth disabled={isSubmitting}>
                  {isSubmitting ? 'Signing in…' : 'Login'}
                </Button>
              </motion.div>

              {/* Cross-link */}
              <motion.p
                variants={revealItem}
                className="text-sm text-center text-text-muted"
              >
                New to Filmalisa?{' '}
                <Link
                  href="/signup"
                  className="text-accent hover:underline focus-visible:underline"
                >
                  Register here
                </Link>
              </motion.p>
            </motion.div>
          </Form>
        )}
      </Formik>
    </div>
  )
}
