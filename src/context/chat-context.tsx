import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react"
import { askQuestion } from "@/services/chat-api"
import { getErrorMessage } from "@/services/api-error"
import type { ChatMessage } from "@/types"

interface ChatValue {
  messages: ChatMessage[]
  isLoading: boolean
  send: (text: string) => void
  retry: () => void
  reset: () => void
}

const ChatContext = createContext<ChatValue | null>(null)

function createMessage(
  message: Omit<ChatMessage, "id" | "createdAt">
): ChatMessage {
  return {
    ...message,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  }
}

/**
 * Holds the current conversation. It lives until "New conversation" or a page reload,
 * so students can leave the assistant and come back without losing context.
 */
export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Refs mirror state so handlers always see the latest values.
  const messagesRef = useRef<ChatMessage[]>([])
  const loadingRef = useRef(false)
  const conversationRef = useRef(0)

  const commitMessages = useCallback((next: ChatMessage[]) => {
    messagesRef.current = next
    setMessages(next)
  }, [])

  const setLoading = useCallback((value: boolean) => {
    loadingRef.current = value
    setIsLoading(value)
  }, [])

  const ask = useCallback(
    async (question: string, history: ChatMessage[]) => {
      const conversation = conversationRef.current
      setLoading(true)

      let reply: ChatMessage
      try {
        const result = await askQuestion(
          question,
          history
            .filter((message) => message.kind !== "error")
            .map(({ role, content }) => ({ role, content }))
        )
        reply = createMessage({ role: "assistant", ...result })
      } catch (error) {
        reply = createMessage({
          role: "assistant",
          kind: "error",
          content: getErrorMessage(
            error,
            "Something went wrong while searching. Please try again."
          ),
        })
      }

      // The student started a new conversation while waiting.
      if (conversation !== conversationRef.current) return
      commitMessages([...messagesRef.current, reply])
      setLoading(false)
    },
    [commitMessages, setLoading]
  )

  const send = useCallback(
    (text: string) => {
      const question = text.trim()
      if (!question || loadingRef.current) return

      const history = messagesRef.current
      commitMessages([
        ...history,
        createMessage({ role: "user", content: question }),
      ])
      void ask(question, history)
    },
    [ask, commitMessages]
  )

  const retry = useCallback(() => {
    if (loadingRef.current) return
    const current = messagesRef.current
    const last = current[current.length - 1]
    if (last?.kind !== "error") return

    const withoutError = current.slice(0, -1)
    const question = withoutError[withoutError.length - 1]
    if (question?.role !== "user") return

    commitMessages(withoutError)
    void ask(question.content, withoutError.slice(0, -1))
  }, [ask, commitMessages])

  const reset = useCallback(() => {
    conversationRef.current += 1
    commitMessages([])
    setLoading(false)
  }, [commitMessages, setLoading])

  const value = useMemo(
    () => ({ messages, isLoading, send, retry, reset }),
    [messages, isLoading, send, retry, reset]
  )
  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}

export function useChat() {
  const context = useContext(ChatContext)
  if (!context) throw new Error("useChat must be used inside ChatProvider")
  return context
}
