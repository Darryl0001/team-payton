/**
 * Knowledge management API.
 * Each function maps to a future FastAPI endpoint; replace the bodies with fetch calls.
 */
import { ApiError } from "@/services/api-error"
import {
  assertOnline,
  delay,
  readEntries,
  startIndexing,
  stopIndexing,
  writeEntries,
} from "@/services/mock-db"
import type {
  KnowledgeCategory,
  KnowledgeEntry,
  KnowledgeInput,
  PublicationStatus,
} from "@/types"

export interface SaveEntryParams {
  /** Omit to create a new entry. */
  id?: string
  input: KnowledgeInput
  status: PublicationStatus
}

function sortByNewest(list: KnowledgeEntry[]) {
  return [...list].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
}

/** GET /knowledge */
export async function listEntries(): Promise<KnowledgeEntry[]> {
  await delay(500)
  assertOnline()
  return sortByNewest(readEntries())
}

/** POST /knowledge and PUT /knowledge/:id */
export async function saveEntry({
  id,
  input,
  status,
}: SaveEntryParams): Promise<KnowledgeEntry> {
  await delay(700)
  assertOnline()

  if (!input.title.trim() || !input.content.trim() || !input.category) {
    throw new ApiError("Title, category, and content are required.")
  }

  const now = new Date().toISOString()
  const current = readEntries()
  const existing = id ? current.find((entry) => entry.id === id) : undefined
  if (id && !existing) throw new ApiError("This entry no longer exists.")

  // Published entries are chunked and embedded again whenever they are saved.
  const isPublished = status === "published"
  const saved: KnowledgeEntry = {
    id: existing?.id ?? `k-${crypto.randomUUID().slice(0, 8)}`,
    title: input.title.trim(),
    content: input.content.trim(),
    category: input.category as KnowledgeCategory,
    status,
    indexStatus: isPublished ? "processing" : "not_indexed",
    chunkCount: 0,
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
  }

  if (isPublished) startIndexing(saved.id)
  else stopIndexing(saved.id)

  writeEntries(
    existing
      ? current.map((entry) => (entry.id === saved.id ? saved : entry))
      : [saved, ...current]
  )
  return saved
}

/** DELETE /knowledge/:id */
export async function deleteEntry(id: string): Promise<void> {
  await delay(500)
  assertOnline()
  stopIndexing(id)
  writeEntries(readEntries().filter((entry) => entry.id !== id))
}
