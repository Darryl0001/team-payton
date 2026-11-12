/** Splits entry content into chunks. Each paragraph (separated by a blank line) is one chunk. */
export function splitIntoChunks(content: string): string[] {
  return content
    .split(/\n\s*\n/)
    .map((chunk) => chunk.trim())
    .filter(Boolean)
}

const dateFormatter = new Intl.DateTimeFormat("en", {
  year: "numeric",
  month: "short",
  day: "numeric",
})

export function formatDate(iso: string): string {
  return dateFormatter.format(new Date(iso))
}

export type TextBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; ordered: boolean; items: string[] }

/**
 * Parses the light formatting used in answers and knowledge content:
 * paragraphs, "- " bullet lists, and "1. " numbered lists.
 */
export function parseBlocks(content: string): TextBlock[] {
  const blocks: TextBlock[] = []
  let paragraph: string[] = []

  const flushParagraph = () => {
    if (paragraph.length > 0) {
      blocks.push({ type: "paragraph", text: paragraph.join(" ") })
      paragraph = []
    }
  }

  for (const rawLine of content.split("\n")) {
    const line = rawLine.trim()
    const bullet = line.match(/^[-*]\s+(.*)$/)
    const numbered = line.match(/^\d+[.)]\s+(.*)$/)

    if (!line) {
      flushParagraph()
    } else if (bullet || numbered) {
      flushParagraph()
      const ordered = Boolean(numbered)
      const text = (bullet ?? numbered)![1]
      const last = blocks[blocks.length - 1]
      if (last?.type === "list" && last.ordered === ordered) {
        last.items.push(text)
      } else {
        blocks.push({ type: "list", ordered, items: [text] })
      }
    } else {
      paragraph.push(line)
    }
  }
  flushParagraph()

  return blocks
}
