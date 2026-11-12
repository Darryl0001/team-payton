/**
 * In-memory stand-in for the backend database.
 * Only the service modules (knowledge-api, chat-api, auth-api) may import this file.
 * Remove it when the FastAPI backend is connected.
 */
import { seedKnowledge } from "@/data/mock-knowledge"
import { splitIntoChunks } from "@/lib/text"
import { ApiError } from "@/services/api-error"
import type { KnowledgeEntry } from "@/types"

/** How long the simulated chunking and embedding takes. */
const INDEXING_DURATION_MS = 3000

/** Bump when the seed data changes so stale saved data is discarded. */
const STORAGE_KEY = "campusquery.mock-knowledge.v1"

function loadEntries(): KnowledgeEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const saved = JSON.parse(raw) as KnowledgeEntry[]
      // Indexing timers do not survive a reload, so unfinished jobs are completed.
      return saved.map((entry) =>
        entry.indexStatus === "processing"
          ? {
              ...entry,
              indexStatus: "indexed",
              chunkCount: splitIntoChunks(entry.content).length,
            }
          : entry
      )
    }
  } catch {
    // Fall back to the seed data.
  }
  return seedKnowledge.map((entry) => ({
    ...entry,
    chunkCount:
      entry.indexStatus === "indexed" ? splitIntoChunks(entry.content).length : 0,
  }))
}

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
  } catch {
    // Storage can be unavailable; changes then last until reload.
  }
}

let entries: KnowledgeEntry[] = loadEntries()

const indexingUntil = new Map<string, number>()

export function delay(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms))
}

/** Simulates a network failure so error states can be exercised. */
export function assertOnline() {
  if (typeof navigator !== "undefined" && !navigator.onLine) {
    throw new ApiError("You appear to be offline. Check your connection and try again.")
  }
}

/** Completes any indexing jobs whose time is up. */
function settleIndexing() {
  const now = Date.now()
  let changed = false
  for (const [id, readyAt] of indexingUntil) {
    if (now < readyAt) continue
    changed = true
    indexingUntil.delete(id)
    entries = entries.map((entry) =>
      entry.id === id && entry.indexStatus === "processing"
        ? {
            ...entry,
            indexStatus: "indexed",
            chunkCount: splitIntoChunks(entry.content).length,
          }
        : entry
    )
  }
  if (changed) persist()
}

export function readEntries(): KnowledgeEntry[] {
  settleIndexing()
  return entries
}

export function writeEntries(next: KnowledgeEntry[]) {
  entries = next
  persist()
}

export function startIndexing(id: string) {
  indexingUntil.set(id, Date.now() + INDEXING_DURATION_MS)
}

export function stopIndexing(id: string) {
  indexingUntil.delete(id)
}
