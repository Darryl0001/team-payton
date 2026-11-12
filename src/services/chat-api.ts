/**
 * Chat API (mock).
 * Replace with a call to the FastAPI RAG endpoint; the request and response shapes
 * (question + history in, AssistantReply out) are the contract to keep.
 */
import { assertOnline, delay, readEntries } from "@/services/mock-db"
import { retrievePassages, tokenize, type RetrievedPassage } from "@/services/retrieval"
import type { AssistantReply, ChatHistoryItem, Source } from "@/types"

const FALLBACK_REPLY: AssistantReply = {
  kind: "fallback",
  content:
    "No matching information found.\n\nCampusQuery only answers from published college information. Try rephrasing your question, or contact the college office directly.",
  sources: [],
}

function toReply(passages: RetrievedPassage[]): AssistantReply {
  const top = passages[0]
  // Include a second entry only when it is almost as relevant as the first.
  const chosen = passages.filter(
    (passage, index) => index === 0 || (index < 2 && passage.score >= top.score * 0.8)
  )

  const sources: Source[] = chosen.map(({ entry, chunks }) => ({
    entryId: entry.id,
    title: entry.title,
    category: entry.category,
    updatedAt: entry.updatedAt,
    excerpt: chunks.join("\n\n"),
  }))

  return {
    kind: "answer",
    content: sources.map((source) => source.excerpt).join("\n\n"),
    sources,
  }
}

const REFERENCE_WORDS = /\b(it|its|that|this|they|them|those|these|there|also|more|else)\b/i

/** A question that depends on the previous one: it has almost no keywords or refers back. */
function isFollowUp(question: string): boolean {
  return tokenize(question).length <= 1 || REFERENCE_WORDS.test(question)
}

/** POST /chat */
export async function askQuestion(
  question: string,
  history: ChatHistoryItem[]
): Promise<AssistantReply> {
  await delay(700 + Math.random() * 700)
  assertOnline()

  // Only published entries that finished indexing can be retrieved.
  const searchable = readEntries().filter(
    (entry) => entry.status === "published" && entry.indexStatus === "indexed"
  )

  let passages = retrievePassages(question, searchable)

  // Follow-ups such as "How do I pay for it?" borrow context from the previous question.
  if (passages.length === 0 && isFollowUp(question)) {
    const previous = [...history].reverse().find((item) => item.role === "user")
    if (previous) {
      passages = retrievePassages(`${previous.content} ${question}`, searchable)
    }
  }

  return passages.length > 0 ? toReply(passages) : FALLBACK_REPLY
}
