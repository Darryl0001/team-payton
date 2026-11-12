import { Fragment } from "react"
import { parseBlocks } from "@/lib/text"
import { cn } from "@/lib/utils"

/** Renders **bold** text inside a line. */
function Inline({ text }: { text: string }) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, index) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={index} className="font-semibold">
        {part.slice(2, -2)}
      </strong>
    ) : (
      <Fragment key={index}>{part}</Fragment>
    )
  )
}

/** Displays paragraphs, bullet lists, and numbered lists from plain text. */
export function FormattedText({
  content,
  className,
}: {
  content: string
  className?: string
}) {
  return (
    <div className={cn("space-y-3 text-sm leading-relaxed", className)}>
      {parseBlocks(content).map((block, index) => {
        if (block.type === "paragraph") {
          return (
            <p key={index}>
              <Inline text={block.text} />
            </p>
          )
        }
        const List = block.ordered ? "ol" : "ul"
        return (
          <List
            key={index}
            className={cn(
              "space-y-1 pl-5",
              block.ordered ? "list-decimal" : "list-disc"
            )}
          >
            {block.items.map((item, itemIndex) => (
              <li key={itemIndex}>
                <Inline text={item} />
              </li>
            ))}
          </List>
        )
      })}
    </div>
  )
}
