import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import * as knowledgeApi from "@/services/knowledge-api"
import { getErrorMessage } from "@/services/api-error"
import type { SaveEntryParams } from "@/services/knowledge-api"
import type { KnowledgeEntry } from "@/types"

type LoadStatus = "loading" | "ready" | "error"

interface KnowledgeValue {
  entries: KnowledgeEntry[]
  status: LoadStatus
  error: string | null
  reload: () => Promise<void>
  getEntry: (id: string) => KnowledgeEntry | undefined
  save: (params: SaveEntryParams) => Promise<KnowledgeEntry>
  remove: (id: string) => Promise<void>
}

const KnowledgeContext = createContext<KnowledgeValue | null>(null)

const INDEX_POLL_MS = 1000

function byNewest(list: KnowledgeEntry[]) {
  return [...list].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
}

/** Shared knowledge state for the administrator pages. */
export function KnowledgeProvider({ children }: { children: React.ReactNode }) {
  const [entries, setEntries] = useState<KnowledgeEntry[]>([])
  const [status, setStatus] = useState<LoadStatus>("loading")
  const [error, setError] = useState<string | null>(null)

  const fetchEntries = useCallback(async () => {
    try {
      setEntries(await knowledgeApi.listEntries())
      setStatus("ready")
    } catch (err) {
      setError(getErrorMessage(err, "Knowledge entries could not be loaded."))
      setStatus("error")
    }
  }, [])

  const reload = useCallback(async () => {
    setStatus("loading")
    setError(null)
    await fetchEntries()
  }, [fetchEntries])

  useEffect(() => {
    void fetchEntries()
  }, [fetchEntries])

  // Keep checking while published entries are being chunked and embedded.
  useEffect(() => {
    if (!entries.some((entry) => entry.indexStatus === "processing")) return
    const timer = setTimeout(async () => {
      try {
        setEntries(await knowledgeApi.listEntries())
      } catch {
        // Try again on the next change; the list stays as it was.
      }
    }, INDEX_POLL_MS)
    return () => clearTimeout(timer)
  }, [entries])

  const getEntry = useCallback(
    (id: string) => entries.find((entry) => entry.id === id),
    [entries]
  )

  const save = useCallback(async (params: SaveEntryParams) => {
    const saved = await knowledgeApi.saveEntry(params)
    setEntries((current) =>
      byNewest([saved, ...current.filter((entry) => entry.id !== saved.id)])
    )
    return saved
  }, [])

  const remove = useCallback(async (id: string) => {
    await knowledgeApi.deleteEntry(id)
    setEntries((current) => current.filter((entry) => entry.id !== id))
  }, [])

  const value = useMemo(
    () => ({ entries, status, error, reload, getEntry, save, remove }),
    [entries, status, error, reload, getEntry, save, remove]
  )
  return (
    <KnowledgeContext.Provider value={value}>{children}</KnowledgeContext.Provider>
  )
}

export function useKnowledge() {
  const context = useContext(KnowledgeContext)
  if (!context) throw new Error("useKnowledge must be used inside KnowledgeProvider")
  return context
}
