import { FormattedText } from "@/components/formatted-text"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import type { ChatMessage, Source } from "@/types"

interface ChatMessageItemProps {
  message: ChatMessage
  onOpenSource: (source: Source) => void
  /** Offered only on the latest failed message. */
  onRetry?: () => void
}

export function ChatMessageItem({
  message,
  onOpenSource,
  onRetry,
}: ChatMessageItemProps) {
  if (message.role === "user") {
    return (
      <div className="flex justify-end">
        <p className="max-w-[85%] rounded-2xl bg-primary px-4 py-2.5 text-sm break-words whitespace-pre-wrap text-primary-foreground">
          <span className="sr-only">You: </span>
          {message.content}
        </p>
      </div>
    )
  }

  if (message.kind === "error") {
    return (
      <Alert variant="destructive">
        <AlertDescription className="flex flex-wrap items-center justify-between gap-2">
          <span>{message.content}</span>
          {onRetry && (
            <Button variant="outline" size="sm" onClick={onRetry}>
              Try again
            </Button>
          )}
        </AlertDescription>
      </Alert>
    )
  }

  const sources = message.sources ?? []

  return (
    <div>
      <p className="mb-1.5 text-xs font-medium text-muted-foreground">CampusQuery</p>
      <FormattedText content={message.content} />

      {sources.length > 0 && (
        <div className="mt-4">
          <p className="mb-2 text-xs text-muted-foreground">
            Based on published college information. Sources:
          </p>
          <ul className="flex flex-col items-start gap-2">
            {sources.map((source) => (
              <li key={source.entryId} className="max-w-full">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onOpenSource(source)}
                  className="h-auto max-w-full flex-col items-start gap-0 rounded-2xl px-3 py-1.5 text-left whitespace-normal"
                  aria-label={`View source: ${source.title}`}
                >
                  <span>{source.title}</span>
                  <span className="text-xs font-normal text-muted-foreground">
                    {source.category}
                  </span>
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
