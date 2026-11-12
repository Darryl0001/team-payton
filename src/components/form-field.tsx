import { Label } from "@/components/ui/label"

interface ControlProps {
  id: string
  "aria-invalid": boolean
  "aria-describedby": string | undefined
}

interface FormFieldProps {
  id: string
  label: string
  error?: string
  hint?: string
  children: (controlProps: ControlProps) => React.ReactNode
}

/** Label, control, hint, and error message wired together for accessibility. */
export function FormField({ id, label, error, hint, children }: FormFieldProps) {
  const errorId = `${id}-error`
  const hintId = `${id}-hint`
  const describedBy =
    [error ? errorId : null, hint ? hintId : null].filter(Boolean).join(" ") ||
    undefined

  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      {children({ id, "aria-invalid": Boolean(error), "aria-describedby": describedBy })}
      {error && (
        <p id={errorId} className="text-sm text-destructive">
          {error}
        </p>
      )}
      {hint && (
        <p id={hintId} className="text-xs text-muted-foreground">
          {hint}
        </p>
      )}
    </div>
  )
}
