/**
 * Administrator authentication API (mock).
 * Replace with FastAPI / Supabase auth calls when the backend is available.
 */
import { ApiError } from "@/services/api-error"
import { assertOnline, delay } from "@/services/mock-db"
import type { AdminUser } from "@/types"

/** Mock credentials. Shown on the login page only until real authentication exists. */
export const MOCK_ADMIN_EMAIL = "admin@campusquery.edu"
export const MOCK_ADMIN_PASSWORD = "admin1234"

const SESSION_KEY = "campusquery.admin"

export function getSession(): AdminUser | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY)
    return raw ? (JSON.parse(raw) as AdminUser) : null
  } catch {
    return null
  }
}

function saveSession(user: AdminUser | null) {
  try {
    if (user) sessionStorage.setItem(SESSION_KEY, JSON.stringify(user))
    else sessionStorage.removeItem(SESSION_KEY)
  } catch {
    // Storage can be unavailable (private mode); the session then lasts until reload.
  }
}

/** POST /auth/login */
export async function login(email: string, password: string): Promise<AdminUser> {
  await delay(800)
  assertOnline()

  if (
    email.trim().toLowerCase() !== MOCK_ADMIN_EMAIL ||
    password !== MOCK_ADMIN_PASSWORD
  ) {
    throw new ApiError("Incorrect email or password.")
  }

  const user: AdminUser = { name: "Administrator", email: MOCK_ADMIN_EMAIL }
  saveSession(user)
  return user
}

/** POST /auth/logout */
export async function logout(): Promise<void> {
  saveSession(null)
}
