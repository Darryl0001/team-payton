import { useState } from "react"
import { Navigate, useLocation, useNavigate } from "react-router"
import { FormField } from "@/components/form-field"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/context/auth-context"
import { usePageTitle } from "@/hooks/use-page-title"
import { getErrorMessage } from "@/services/api-error"
import { MOCK_ADMIN_EMAIL, MOCK_ADMIN_PASSWORD } from "@/services/auth-api"

interface FieldErrors {
  email?: string
  password?: string
}

function validate(email: string, password: string): FieldErrors {
  const errors: FieldErrors = {}
  if (!email.trim()) errors.email = "Enter your email address."
  else if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
    errors.email = "Enter a valid email address."
  }
  if (!password) errors.password = "Enter your password."
  return errors
}

export function AdminLoginPage() {
  usePageTitle("Admin Login")

  const { user, login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const redirectTo = (location.state as { from?: string } | null)?.from ?? "/admin"

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState<FieldErrors>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (user) return <Navigate to={redirectTo} replace />

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    if (isSubmitting) return

    const nextErrors = validate(email, password)
    setErrors(nextErrors)
    setFormError(null)
    if (Object.keys(nextErrors).length > 0) return

    setIsSubmitting(true)
    try {
      await login(email, password)
      navigate(redirectTo, { replace: true })
    } catch (error) {
      setFormError(getErrorMessage(error, "Could not log in. Please try again."))
      setIsSubmitting(false)
    }
  }

  return (
    <main className="mx-auto w-full max-w-sm flex-1 px-4 py-12 sm:py-20">
      <h1 className="text-2xl font-semibold tracking-tight">Admin login</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Log in to manage college knowledge.
      </p>

      <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-4">
        {formError && (
          <Alert variant="destructive">
            <AlertDescription>{formError}</AlertDescription>
          </Alert>
        )}

        <FormField id="email" label="Email" error={errors.email}>
          {(props) => (
            <Input
              {...props}
              type="email"
              autoComplete="username"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          )}
        </FormField>

        <FormField id="password" label="Password" error={errors.password}>
          {(props) => (
            <Input
              {...props}
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          )}
        </FormField>

        <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
          {isSubmitting ? "Logging in…" : "Log in"}
        </Button>
      </form>

      {/* Mock authentication only. Remove when the backend login is connected. */}
      <p className="mt-6 text-xs text-muted-foreground">
        Demo account: {MOCK_ADMIN_EMAIL} / {MOCK_ADMIN_PASSWORD}
      </p>
    </main>
  )
}
