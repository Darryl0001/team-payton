import { useRef, useState } from "react"
import { ArrowUpIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface ChatInputProps {
  onSend: (text: string) => void
  /** Blocks sending while an answer is being prepared. */
  isBusy: boolean
}

export function ChatInput({ onSend, isBusy }: ChatInputProps) {
  const [value, setValue] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const canSend = value.trim().length > 0 && !isBusy

  function submit() {
    if (!canSend) return
    onSend(value)
    setValue("")
    textareaRef.current?.focus()
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        submit()
      }}
    >
      <Label htmlFor="chat-question" className="sr-only">
        Your question
      </Label>
      <div className="flex items-end gap-2">
        <Textarea
          id="chat-question"
          ref={textareaRef}
          value={value}
          rows={1}
          maxLength={1000}
          placeholder="Ask a question about enrollment."
          className="max-h-40 min-h-10 resize-none overflow-y-auto py-2.5"
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={(event) => {
            if (
              event.key === "Enter" &&
              !event.shiftKey &&
              !event.nativeEvent.isComposing
            ) {
              event.preventDefault()
              submit()
            }
          }}
        />
        <Button
          type="submit"
          size="icon-lg"
          disabled={!canSend}
          aria-label="Send question"
        >
          <ArrowUpIcon />
        </Button>
      </div>
      <p className="mt-1.5 hidden text-xs text-muted-foreground sm:block">
        Press Enter to send, Shift + Enter for a new line.
      </p>
    </form>
  )
}
