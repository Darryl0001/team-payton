import { FormattedText } from "@/components/formatted-text"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { formatDate } from "@/lib/text"
import type { Source } from "@/types"

interface SourceSheetProps {
  source: Source | null
  onClose: () => void
}

/** Shows the details of one source without leaving the conversation. */
export function SourceSheet({ source, onClose }: SourceSheetProps) {
  return (
    <Sheet open={source !== null} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="overflow-y-auto">
        {source && (
          <>
            <SheetHeader>
              <SheetTitle className="pr-10">{source.title}</SheetTitle>
              <SheetDescription>
                {source.category} · Updated {formatDate(source.updatedAt)}
              </SheetDescription>
            </SheetHeader>
            <div className="px-6 pb-6">
              <h3 className="mb-2 text-sm font-medium">Relevant information</h3>
              <FormattedText content={source.excerpt} />
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
