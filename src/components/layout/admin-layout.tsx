import { useState } from "react"
import { Link, Outlet, useNavigate } from "react-router"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/auth-context"
import { KnowledgeProvider } from "@/context/knowledge-context"

export function AdminLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  async function handleLogout() {
    setIsLoggingOut(true)
    await logout()
    navigate("/admin/login", { replace: true })
  }

  return (
    <KnowledgeProvider>
      <div className="flex min-h-svh flex-col">
        <header className="sticky top-0 z-20 border-b bg-background">
          <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between gap-3 px-4 sm:px-6">
            <Link to="/admin" className="flex items-baseline gap-2 rounded-lg">
              <span className="text-base font-semibold tracking-tight">CampusQuery</span>
              <span className="text-sm text-muted-foreground">Admin</span>
            </Link>
            <div className="flex items-center gap-3">
              <span className="hidden text-sm text-muted-foreground sm:inline">
                {user?.email}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                disabled={isLoggingOut}
              >
                {isLoggingOut ? "Logging out…" : "Log out"}
              </Button>
            </div>
          </div>
        </header>
        <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6 sm:px-6 sm:py-8">
          <Outlet />
        </main>
      </div>
    </KnowledgeProvider>
  )
}
