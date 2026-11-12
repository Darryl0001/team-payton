import { Link, useParams } from "react-router"
import { ArrowLeftIcon } from "lucide-react"
import { KnowledgeForm } from "@/components/knowledge/knowledge-form"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button, buttonVariants } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useKnowledge } from "@/context/knowledge-context"
import { usePageTitle } from "@/hooks/use-page-title"

export function KnowledgeEditorPage() {
  const { id } = useParams()
  const { status, error, reload, getEntry } = useKnowledge()
  const entry = id ? getEntry(id) : undefined
  const isEditing = Boolean(id)

  usePageTitle(isEditing ? "Edit knowledge" : "Add knowledge")

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        to="/admin"
        className={buttonVariants({ variant: "ghost", size: "sm", className: "-ml-3" })}
      >
        <ArrowLeftIcon data-icon="inline-start" />
        Knowledge
      </Link>
      <h1 className="mt-2 mb-6 text-2xl font-semibold tracking-tight">
        {isEditing ? "Edit knowledge" : "Add knowledge"}
      </h1>

      {isEditing && status === "loading" && (
        <div className="space-y-4" role="status" aria-label="Loading entry">
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-64" />
          <Skeleton className="h-64 w-full" />
        </div>
      )}

      {isEditing && status === "error" && (
        <Alert variant="destructive">
          <AlertDescription className="flex flex-wrap items-center justify-between gap-2">
            <span>{error}</span>
            <Button variant="outline" size="sm" onClick={() => void reload()}>
              Try again
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {isEditing && status === "ready" && !entry && (
        <div className="py-8">
          <p className="font-medium">This entry was not found.</p>
          <p className="mt-1 text-sm text-muted-foreground">
            It may have been deleted.
          </p>
        </div>
      )}

      {(!isEditing || (status === "ready" && entry)) && (
        <KnowledgeForm key={id ?? "new"} entry={entry} />
      )}
    </div>
  )
}
