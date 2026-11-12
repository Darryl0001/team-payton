import { useEffect, useRef, useState } from "react"
import { useSearchParams } from "react-router"
import { Loader2Icon } from "lucide-react"
import { ChatInput } from "@/components/chat/chat-input"
import { ChatMessageItem } from "@/components/chat/chat-message"
import { SourceSheet } from "@/components/chat/source-sheet"
import { Button } from "@/components/ui/button"
import { useChat } from "@/context/chat-context"
import { exampleQuestions } from "@/data/example-questions"
import { usePageTitle } from "@/hooks/use-page-title"
import type { Source } from "@/types"

const suggestedQuestions = exampleQuestions.filter((item) => item.suggested)

export function AssistantPage() {
  usePageTitle("Ask AI")

  const { messages, isLoading, send, retry, reset } = useChat()
  const [activeSource, setActiveSource] = useState<Source | null>(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const endRef = useRef<HTMLDivElement>(null)

  // A question passed from the landing page is asked once, then removed from the URL.
  const initialQuestion = searchParams.get("q")
  useEffect(() => {
    if (!initialQuestion) return
    send(initialQuestion)
    setSearchParams({}, { replace: true })
  }, [initialQuestion, send, setSearchParams])

  useEffect(() => {
    if (messages.length > 0 || isLoading) {
      endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" })
    }
  }, [messages.length, isLoading])

  const isEmpty = messages.length === 0 && !isLoading
  const lastMessage = messages[messages.length - 1]

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 sm:px-6">
      <div className="flex h-14 items-center justify-between">
        <h1 className="text-lg font-semibold">Ask AI</h1>
        {!isEmpty && (
          <Button variant="outline" size="sm" onClick={reset}>
            New conversation
          </Button>
        )}
      </div>

      <div className="flex-1 pb-6">
        {isEmpty ? (
          <div className="pt-4 sm:pt-10">
            <p className="max-w-md text-muted-foreground">
              Ask about admissions, enrollment, fees, scholarships, or student
              services. Answers come from published college information.
            </p>
            <h2 className="mt-8 mb-2 text-sm font-medium">Try asking</h2>
            <ul className="flex flex-col items-start gap-2">
              {suggestedQuestions.map(({ question }) => (
                <li key={question} className="max-w-full">
                  <Button
                    variant="outline"
                    className="h-auto max-w-full rounded-2xl py-2 text-left whitespace-normal"
                    onClick={() => send(question)}
                  >
                    {question}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div role="log" aria-label="Conversation" className="space-y-6 pt-2">
            {messages.map((message) => (
              <ChatMessageItem
                key={message.id}
                message={message}
                onOpenSource={setActiveSource}
                onRetry={
                  message === lastMessage && message.kind === "error"
                    ? retry
                    : undefined
                }
              />
            ))}
            {isLoading && (
              <p
                role="status"
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <Loader2Icon className="size-4 animate-spin" aria-hidden="true" />
                Searching college information…
              </p>
            )}
          </div>
        )}
        <div ref={endRef} className="scroll-mb-40" />
      </div>

      <div className="sticky bottom-0 bg-background pt-2 pb-4">
        <ChatInput onSend={send} isBusy={isLoading} />
      </div>

      <SourceSheet source={activeSource} onClose={() => setActiveSource(null)} />
    </main>
  )
}
