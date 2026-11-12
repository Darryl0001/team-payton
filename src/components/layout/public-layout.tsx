import { Link, NavLink, Outlet } from "react-router"
import { buttonVariants } from "@/components/ui/button"
import { useAuth } from "@/context/auth-context"
import { cn } from "@/lib/utils"

function navClass({ isActive }: { isActive: boolean }) {
  return cn(
    buttonVariants({ variant: "ghost", size: "sm" }),
    "px-2 sm:px-3",
    isActive && "bg-muted"
  )
}

export function PublicLayout() {
  const { user } = useAuth()

  return (
    <div className="flex min-h-svh flex-col">
      <header className="sticky top-0 z-20 border-b bg-background">
        <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between gap-2 px-4 sm:px-6">
          <Link to="/" className="rounded-lg text-base font-semibold tracking-tight">
            CampusQuery
          </Link>
          <nav aria-label="Main" className="flex items-center gap-0.5">
            <NavLink to="/" end className={navClass}>
              Home
            </NavLink>
            <NavLink to="/ask" className={navClass}>
              Ask AI
            </NavLink>
            {user ? (
              <NavLink to="/admin" className={navClass}>
                Dashboard
              </NavLink>
            ) : (
              <NavLink to="/admin/login" className={navClass}>
                Admin Login
              </NavLink>
            )}
          </nav>
        </div>
      </header>
      <Outlet />
    </div>
  )
}
