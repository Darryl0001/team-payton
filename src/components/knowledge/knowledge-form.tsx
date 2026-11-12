import { useRef, useState } from "react"
import { useNavigate } from "react-router"
import { toast } from "sonner"
import { FormField } from "@/components/form-field"
import { IndexStatus, StatusIndicator } from "@/components/knowledge/status-indicator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useKnowledge } from "@/context/knowledge-context"
import { formatDate } from "@/lib/text"
import { getErrorMessage } from "@/services/api-error"
import {
  KNOWLEDGE_CATEGORIES,
  type KnowledgeEntry,
  type KnowledgeInput,
  type PublicationStatus,
} from "@/types"

type Action = "draft" | "publish" | "unpublish" | "save"

type FieldErrors = Partial<Record<keyof KnowledgeInput, string>>

const TITLE_MAX = 150
const CONTENT_MIN = 30

const categoryItems = KNOWLEDGE_CATEGORIES.map((category) => ({
  value: category,
  label: category,
}))

const successMessages: Record<Action, string> = {
  draft: "Saved as an unpublished draft.",
  publish: "Published. Chunking and embedding started.",
  save: "Changes saved. Chunking and embedding started.",
  unpublish: "Unpublished. The assistant no longer uses this entry.",
}

function validate(input: KnowledgeInput): FieldErrors {
  const errors: FieldErrors = {}
  const title = input.title.trim()
  if (!title) errors.title = "Enter a title."
  else if (title.length < 5) errors.title = "Use at least 5 characters."

  if (!input.category) errors.category = "Choose a category."

  const content = input.content.trim()
  if (!content) errors.content = "Enter the content."
  else if (content.length < CONTENT_MIN) {
    errors.content = `Use at least ${CONTENT_MIN} characters so the assistant has enough to answer from.`
  }
  return errors
}

/** Creates a new entry, or edits an existing one when `entry` is provided. */
export function KnowledgeForm({ entry }: { entry?: KnowledgeEntry }) {
  const { save } = useKnowledge()
  const navigate = useNavigate()
  const formRef = useRef<HTMLFormElement>(null)

  const [values, setValues] = useState<KnowledgeInput>({
    title: entry?.title ?? "",
    category: entry?.category ?? "",
    content: entry?.content ?? "",
  })
  const [errors, setErrors] = useState<FieldErrors>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [pending, setPending] = useState<Action | null>(null)

  // Fixed when the form opens so the buttons do not swap while a save completes.
  const [initialStatus] = useState(entry?.status)
  const isPublished = initialStatus === "published"
  const isBusy = pending !== null

  function update<K extends keyof KnowledgeInput>(key: K, value: KnowledgeInput[K]) {
    setValues((current) => ({ ...current, [key]: value }))
    if (errors[key]) setErrors((current) => ({ ...current, [key]: undefined }))
  }

  async function submit(action: Action) {
    if (isBusy) return

    const nextErrors = validate(values)
    setErrors(nextErrors)
    setFormError(null)
    if (Object.keys(nextErrors).length > 0) {
      requestAnimationFrame(() =>
        formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus()
      )
      return
    }

    const status: PublicationStatus =
      action === "publish" || action === "save" ? "published" : "unpublished"

    setPending(action)
    try {
      await save({ id: entry?.id, input: values, status })
      toast.success(successMessages[action])
      navigate("/admin")
    } catch (error) {
      setFormError(getErrorMessage(error, "The entry could not be saved. Please try again."))
      setPending(null)
    }
  }

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={(event) => event.preventDefault()}
      className="space-y-5"
    >
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
        <StatusIndicator status={entry?.status ?? "unpublished"} />
        {entry && <IndexStatus entry={entry} />}
        {entry && (
          <span className="text-xs text-muted-foreground">
            Last updated {formatDate(entry.updatedAt)}
          </span>
        )}
      </div>

      <FormField id="title" label="Title" error={errors.title}>
        {(props) => (
          <Input
            {...props}
            value={values.title}
            maxLength={TITLE_MAX}
            onChange={(event) => update("title", event.target.value)}
          />
        )}
      </FormField>

      <FormField id="category" label="Category" error={errors.category}>
        {(props) => (
          <Select
            value={values.category || null}
            onValueChange={(value) => update("category", (value ?? "") as KnowledgeInput["category"])}
            items={categoryItems}
          >
            <SelectTrigger {...props} className="w-full sm:w-64">
              <SelectValue placeholder="Choose a category" />
            </SelectTrigger>
            <SelectContent alignItemWithTrigger={false}>
              {categoryItems.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </FormField>

      <FormField
        id="content"
        label="Content"
        error={errors.content}
        hint="Leave a blank line between topics. Start lines with “-” for bullet lists or “1.” for steps."
      >
        {(props) => (
          <Textarea
            {...props}
            value={values.content}
            className="min-h-64"
            onChange={(event) => update("content", event.target.value)}
          />
        )}
      </FormField>

      <div className="sticky bottom-0 -mx-4 space-y-3 border-t bg-background px-4 py-3 sm:-mx-6 sm:px-6">
        {formError && (
          <Alert variant="destructive">
            <AlertDescription>{formError}</AlertDescription>
          </Alert>
        )}
        <div className="flex flex-wrap items-center justify-end gap-2">
          {isPublished ? (
            <>
              <Button
                type="button"
                variant="outline"
                disabled={isBusy}
                onClick={() => void submit("unpublish")}
              >
                {pending === "unpublish" ? "Unpublishing…" : "Unpublish"}
              </Button>
              <Button type="button" disabled={isBusy} onClick={() => void submit("save")}>
                {pending === "save" ? "Saving…" : "Save changes"}
              </Button>
            </>
          ) : (
            <>
              <Button
                type="button"
                variant="outline"
                disabled={isBusy}
                onClick={() => void submit("draft")}
              >
                {pending === "draft" ? "Saving…" : "Save Draft"}
              </Button>
              <Button type="button" disabled={isBusy} onClick={() => void submit("publish")}>
                {pending === "publish" ? "Publishing…" : "Publish"}
              </Button>
            </>
          )}
        </div>
      </div>
    </form>
  )
}
