import { Loader2Icon } from "lucide-react"
import { cn } from "@/lib/utils"
import type { KnowledgeEntry, PublicationStatus } from "@/types"

/** Publication status shown as a marker plus a text label, never color alone. */
export function StatusIndicator({ status }: { status: PublicationStatus }) {
  const isPublished = status === "published"
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-sm",
        !isPublished && "text-muted-foreground"
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "size-2 rounded-full",
          isPublished ? "bg-primary" : "border border-muted-foreground"
        )}
      />
      {isPublished ? "Published" : "Unpublished"}
    </span>
  )
}

/** Chunking and embedding progress for a published entry. Renders nothing otherwise. */
export function IndexStatus({
  entry,
}: {
  entry: Pick<KnowledgeEntry, "indexStatus" | "chunkCount">
}) {
  if (entry.indexStatus === "processing") {
    return (
      <span
        role="status"
        className="inline-flex items-center gap-1.5 text-xs text-muted-foreground"
      >
        <Loader2Icon className="size-3 animate-spin" aria-hidden="true" />
        Chunking and embedding…
      </span>
    )
  }
  if (entry.indexStatus === "indexed") {
    return (
      <span className="text-xs text-muted-foreground">
        Indexed · {entry.chunkCount} {entry.chunkCount === 1 ? "chunk" : "chunks"}
      </span>
    )
  }
  return null
}
