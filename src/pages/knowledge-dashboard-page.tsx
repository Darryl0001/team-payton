import { useMemo, useState } from "react"
import { Link } from "react-router"
import { toast } from "sonner"
import { IndexStatus, StatusIndicator } from "@/components/knowledge/status-indicator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useKnowledge } from "@/context/knowledge-context"
import { usePageTitle } from "@/hooks/use-page-title"
import { formatDate } from "@/lib/text"
import { getErrorMessage } from "@/services/api-error"
import { KNOWLEDGE_CATEGORIES, type KnowledgeEntry } from "@/types"

const ALL = "all"

const categoryItems = [
  { value: ALL, label: "All categories" },
  ...KNOWLEDGE_CATEGORIES.map((category) => ({ value: category, label: category })),
]

function EntryActions({
  entry,
  onDelete,
}: {
  entry: KnowledgeEntry
  onDelete: (entry: KnowledgeEntry) => void
}) {
  return (
    <div className="flex items-center gap-1">
      <Link
        to={`/admin/knowledge/${entry.id}`}
        className={buttonVariants({ variant: "ghost", size: "sm" })}
        aria-label={`Edit ${entry.title}`}
      >
        Edit
      </Link>
      <Button
        variant="ghost"
        size="sm"
        className="text-destructive hover:text-destructive"
        onClick={() => onDelete(entry)}
        aria-label={`Delete ${entry.title}`}
      >
        Delete
      </Button>
    </div>
  )
}

function EntryStatus({ entry }: { entry: KnowledgeEntry }) {
  return (
    <div className="flex flex-col items-start gap-0.5">
      <StatusIndicator status={entry.status} />
      <IndexStatus entry={entry} />
    </div>
  )
}

export function KnowledgeDashboardPage() {
  usePageTitle("Knowledge")

  const { entries, status, error, reload, remove } = useKnowledge()
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState<string>(ALL)
  const [entryToDelete, setEntryToDelete] = useState<KnowledgeEntry | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const counts = useMemo(() => {
    const published = entries.filter((entry) => entry.status === "published").length
    return { total: entries.length, published, unpublished: entries.length - published }
  }, [entries])

  const visibleEntries = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return entries.filter(
      (entry) =>
        (category === ALL || entry.category === category) &&
        (!needle ||
          entry.title.toLowerCase().includes(needle) ||
          entry.content.toLowerCase().includes(needle))
    )
  }, [entries, query, category])

  const isFiltered = query.trim() !== "" || category !== ALL

  function clearFilters() {
    setQuery("")
    setCategory(ALL)
  }

  async function confirmDelete() {
    if (!entryToDelete || isDeleting) return
    setIsDeleting(true)
    try {
      await remove(entryToDelete.id)
      toast.success("Entry deleted.")
      setEntryToDelete(null)
    } catch (err) {
      toast.error(getErrorMessage(err, "The entry could not be deleted."))
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Knowledge</h1>
          {status === "ready" && (
            <p className="mt-1 text-sm text-muted-foreground">
              {counts.total} {counts.total === 1 ? "entry" : "entries"} ·{" "}
              {counts.published} published · {counts.unpublished} unpublished
            </p>
          )}
        </div>
        <Link to="/admin/knowledge/new" className={buttonVariants()}>
          Add Knowledge
        </Link>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by title or content"
          aria-label="Search knowledge entries"
          className="sm:max-w-sm"
        />
        <Select
          value={category}
          onValueChange={(value) => setCategory(value ?? ALL)}
          items={categoryItems}
        >
          <SelectTrigger aria-label="Filter by category" className="w-full sm:w-52">
            <SelectValue />
          </SelectTrigger>
          <SelectContent alignItemWithTrigger={false}>
            {categoryItems.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="mt-6">
        {status === "loading" && (
          <div className="space-y-3" role="status" aria-label="Loading knowledge entries">
            {Array.from({ length: 5 }, (_, index) => (
              <Skeleton key={index} className="h-14 w-full" />
            ))}
          </div>
        )}

        {status === "error" && (
          <Alert variant="destructive">
            <AlertDescription className="flex flex-wrap items-center justify-between gap-2">
              <span>{error}</span>
              <Button variant="outline" size="sm" onClick={() => void reload()}>
                Try again
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {status === "ready" && entries.length === 0 && (
          <div className="py-12 text-center">
            <p className="font-medium">No knowledge entries yet.</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Add the first entry so the assistant has information to answer from.
            </p>
            <Link
              to="/admin/knowledge/new"
              className={buttonVariants({ className: "mt-4" })}
            >
              Add Knowledge
            </Link>
          </div>
        )}

        {status === "ready" && entries.length > 0 && visibleEntries.length === 0 && (
          <div className="py-12 text-center">
            <p className="font-medium">No matching entries.</p>
            <Button variant="outline" size="sm" className="mt-4" onClick={clearFilters}>
              Clear filters
            </Button>
          </div>
        )}

        {status === "ready" && visibleEntries.length > 0 && (
          <>
            {isFiltered && (
              <p className="mb-2 text-sm text-muted-foreground" role="status">
                Showing {visibleEntries.length} of {entries.length}
              </p>
            )}

            {/* Table for tablet and desktop */}
            <div className="hidden md:block">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last updated</TableHead>
                    <TableHead className="w-0">
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {visibleEntries.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell className="max-w-xs font-medium whitespace-normal">
                        {entry.title}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {entry.category}
                      </TableCell>
                      <TableCell>
                        <EntryStatus entry={entry} />
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {formatDate(entry.updatedAt)}
                      </TableCell>
                      <TableCell>
                        <EntryActions entry={entry} onDelete={setEntryToDelete} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* List for mobile */}
            <ul className="divide-y border-y md:hidden">
              {visibleEntries.map((entry) => (
                <li key={entry.id} className="py-3">
                  <p className="font-medium">{entry.title}</p>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {entry.category} · Updated {formatDate(entry.updatedAt)}
                  </p>
                  <div className="mt-2 flex items-center justify-between gap-2">
                    <EntryStatus entry={entry} />
                    <EntryActions entry={entry} onDelete={setEntryToDelete} />
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      <AlertDialog
        open={entryToDelete !== null}
        onOpenChange={(open) => !open && !isDeleting && setEntryToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this entry?</AlertDialogTitle>
            <AlertDialogDescription>
              “{entryToDelete?.title}” will be deleted permanently
              {entryToDelete?.status === "published"
                ? ", and the assistant will no longer use it."
                : "."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <Button
              variant="destructive"
              onClick={() => void confirmDelete()}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting…" : "Delete"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
