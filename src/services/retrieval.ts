/**
 * Simulated retrieval over published knowledge, used only by the mock chat API.
 * The real backend will replace this with pgvector similarity search.
 */
import { splitIntoChunks } from "@/lib/text"
import type { KnowledgeEntry } from "@/types"

const STOPWORDS = new Set(
  (
    "a an and are as at be by can could do does for from get got has have how i if in into is it its " +
    "me my of on or our please should so tell that the their them there these this to us was we " +
    "what when where which who why will with would you your about know need want may must much " +
    "many any some student students college school campus"
  ).split(" ")
)

function stem(word: string): string {
  if (word.length > 5 && word.endsWith("ies")) return word.slice(0, -3) + "y"
  if (word.length > 5 && word.endsWith("ing")) return word.slice(0, -3)
  if (word.length > 4 && word.endsWith("ed")) return word.slice(0, -2)
  if (word.length > 4 && word.endsWith("es")) return word.slice(0, -2)
  if (word.length > 3 && word.endsWith("s") && !word.endsWith("ss")) {
    return word.slice(0, -1)
  }
  return word
}

export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((word) => word.length > 1 && !STOPWORDS.has(word))
    .map(stem)
}

function tokensMatch(a: string, b: string): boolean {
  if (a === b) return true
  if (a.length >= 5 && b.length >= 5) return a.startsWith(b) || b.startsWith(a)
  return false
}

function hasToken(tokens: string[], query: string): boolean {
  return tokens.some((token) => tokensMatch(token, query))
}

export interface RetrievedPassage {
  entry: KnowledgeEntry
  chunks: string[]
  score: number
}

/** Minimum share of the question's keywords that must be found. */
const MIN_COVERAGE = 0.3

export function retrievePassages(
  question: string,
  entries: KnowledgeEntry[]
): RetrievedPassage[] {
  const queryTokens = [...new Set(tokenize(question))]
  if (queryTokens.length === 0) return []

  const scored = entries.map((entry) => {
    const titleTokens = tokenize(`${entry.title} ${entry.category}`)
    const chunks = splitIntoChunks(entry.content).map((text) => {
      const chunkTokens = tokenize(text)
      const total = queryTokens.reduce((sum, token) => {
        if (hasToken(chunkTokens, token)) return sum + 1
        if (hasToken(titleTokens, token)) return sum + 0.5
        return sum
      }, 0)
      return { text, score: total / queryTokens.length }
    })
    return { entry, chunks }
  })

  const results: RetrievedPassage[] = []
  for (const { entry, chunks } of scored) {
    const best = Math.max(0, ...chunks.map((chunk) => chunk.score))
    if (best < MIN_COVERAGE) continue

    const used = chunks
      .filter((chunk) => chunk.score >= Math.max(MIN_COVERAGE, best * 0.6))
      .sort((a, b) => b.score - a.score)
      .slice(0, 2)
    // Keep the original order of the entry so lists and steps stay readable.
    const ordered = chunks.filter((chunk) => used.includes(chunk))
    results.push({ entry, chunks: ordered.map((chunk) => chunk.text), score: best })
  }

  return results.sort((a, b) => b.score - a.score)
}
