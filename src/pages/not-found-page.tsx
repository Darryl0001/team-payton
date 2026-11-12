import { Link } from "react-router"
import { buttonVariants } from "@/components/ui/button"
import { usePageTitle } from "@/hooks/use-page-title"

export function NotFoundPage() {
  usePageTitle("Page not found")

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-16 sm:px-6">
      <h1 className="text-2xl font-semibold tracking-tight">Page not found</h1>
      <p className="mt-2 text-muted-foreground">
        The page you are looking for does not exist.
      </p>
      <Link to="/" className={buttonVariants({ className: "mt-6" })}>
        Go to Home
      </Link>
    </main>
  )
}
