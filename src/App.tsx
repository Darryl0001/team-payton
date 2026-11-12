import { BrowserRouter, Route, Routes } from "react-router"
import { AdminLayout } from "@/components/layout/admin-layout"
import { PublicLayout } from "@/components/layout/public-layout"
import { RequireAuth } from "@/components/layout/require-auth"
import { Toaster } from "@/components/ui/sonner"
import { AuthProvider } from "@/context/auth-context"
import { ChatProvider } from "@/context/chat-context"
import { AdminLoginPage } from "@/pages/admin-login-page"
import { AssistantPage } from "@/pages/assistant-page"
import { KnowledgeDashboardPage } from "@/pages/knowledge-dashboard-page"
import { KnowledgeEditorPage } from "@/pages/knowledge-editor-page"
import { LandingPage } from "@/pages/landing-page"
import { NotFoundPage } from "@/pages/not-found-page"

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ChatProvider>
          <Routes>
            <Route element={<PublicLayout />}>
              <Route index element={<LandingPage />} />
              <Route path="ask" element={<AssistantPage />} />
              <Route path="admin/login" element={<AdminLoginPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>

            <Route element={<RequireAuth />}>
              <Route path="admin" element={<AdminLayout />}>
                <Route index element={<KnowledgeDashboardPage />} />
                <Route path="knowledge/new" element={<KnowledgeEditorPage />} />
                <Route path="knowledge/:id" element={<KnowledgeEditorPage />} />
              </Route>
            </Route>
          </Routes>
          <Toaster position="bottom-center" />
        </ChatProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
