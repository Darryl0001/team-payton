import { Navigate, Outlet, useLocation } from "react-router"
import { useAuth } from "@/context/auth-context"

/** Redirects visitors without an administrator session to the login page. */
export function RequireAuth() {
  const { user } = useAuth()
  const location = useLocation()

  if (!user) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />
  }
  return <Outlet />
}
