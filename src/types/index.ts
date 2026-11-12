export const KNOWLEDGE_CATEGORIES = [
  "Admissions",
  "Enrollment",
  "Tuition and Fees",
  "Scholarships",
  "Academic Calendar",
  "Academic Policies",
  "Student Services",
  "Campus Facilities",
] as const

export type KnowledgeCategory = (typeof KNOWLEDGE_CATEGORIES)[number]

export type PublicationStatus = "published" | "unpublished"

/** Chunking and embedding progress for a knowledge entry. */
export type IndexStatus = "not_indexed" | "processing" | "indexed"

export interface KnowledgeEntry {
  id: string
  title: string
  content: string
  category: KnowledgeCategory
  status: PublicationStatus
  indexStatus: IndexStatus
  chunkCount: number
  createdAt: string
  updatedAt: string
}

/** Fields an administrator can edit. */
export interface KnowledgeInput {
  title: string
  content: string
  category: KnowledgeCategory | ""
}

export interface Source {
  entryId: string
  title: string
  category: KnowledgeCategory
  updatedAt: string
  /** The passages from the entry that were used for the answer. */
  excerpt: string
}

export type MessageKind = "answer" | "fallback" | "error"

export interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  /** Only set on assistant messages. */
  kind?: MessageKind
  sources?: Source[]
  createdAt: string
}

export interface AssistantReply {
  kind: Exclude<MessageKind, "error">
  content: string
  sources: Source[]
}

export interface ChatHistoryItem {
  role: ChatMessage["role"]
  content: string
}

export interface AdminUser {
  name: string
  email: string
}
