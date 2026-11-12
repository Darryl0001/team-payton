# CampusQuery — Frontend Development Roadmap

## Project Goal

Develop the frontend of CampusQuery, an AI-powered college knowledge assistant using React, TypeScript, Tailwind CSS, and shadcn/ui.

Follow the approved concept paper and build a clean, modern, responsive, and functional MVP.

## Development Rules

- Inspect the existing project before making changes.
- Preserve the existing dependencies, configuration, and preset theme.
- Use React, TypeScript, Tailwind CSS, and existing shadcn/ui components.
- Use reusable components and maintain a clean project structure.
- Use mock data for features that require backend integration.
- Implement functional interactions, not just static UI.
- Avoid unnecessary dependencies, overengineering, and unrelated features.
- Maintain consistent UI/UX across all pages.
- Do not implement features outside the defined project scope.
- Complete and verify each phase before proceeding to the next.

---

## Phase 01 — Project Inspection and Foundation

- Inspect the existing project structure and configuration.
- Identify installed dependencies and available shadcn/ui components.
- Establish the application layout, routing, and shared component structure.
- Preserve the existing theme and styling conventions.
- Prepare reusable layouts for public and administrator pages.

**Output:** Organized and ready-to-develop frontend foundation.

## Phase 02 — Landing Page

Develop the public-facing CampusQuery landing page.

- Introduce CampusQuery and its purpose.
- Provide a clear primary action to open the AI Assistant.
- Include a concise explanation of how the system works.
- Include relevant college information categories or example questions.
- Provide navigation to Home, Ask AI, and Admin Login.
- Ensure responsive behavior.

**Output:** Complete and functional landing page.

## Phase 03 — AI Assistant Interface

Develop the student-facing conversational interface.

- Create a clean chat layout.
- Include a message input and send button.
- Display student messages and AI responses.
- Support Enter to send and Shift + Enter for new lines.
- Include suggested questions for first-time users.
- Display loading, empty, and error states.
- Provide a New Conversation action.
- Maintain temporary conversation context during the session.

**Output:** Functional AI assistant interface using mock responses.

## Phase 04 — AI Response and Source References

Implement the visual structure of AI-generated responses.

- Display readable AI-generated answers.
- Support paragraphs, lists, and basic formatted content.
- Display source references below applicable answers.
- Show source title, category, and relevant information.
- Allow users to inspect or open source details.
- Display a clear fallback when no relevant information is available.
- Indicate when an answer is based on available college knowledge.

**Output:** Complete response experience with simulated retrieval and sources.

## Phase 05 — Administrator Authentication

Develop the administrator login interface.

- Create a dedicated Admin Login page.
- Include email and password fields.
- Implement form validation.
- Display loading and error states.
- Provide a login action using mock authentication initially.
- Protect administrator routes from unauthorized access.
- Provide logout functionality.

**Output:** Functional frontend authentication flow ready for backend integration.

## Phase 06 — Knowledge Dashboard

Develop the administrator knowledge management dashboard.

- Display total knowledge entries.
- Display published and unpublished entry counts.
- List existing knowledge entries.
- Include search and category filtering.
- Display entry title, category, status, and last updated date.
- Provide actions to add, edit, and delete entries.
- Provide a clear publication status indicator.
- Include appropriate empty and loading states.

**Output:** Functional knowledge management dashboard using mock data.

## Phase 07 — Knowledge Editor

Develop a reusable editor for creating and editing knowledge entries.

- Provide title and content fields.
- Include category selection.
- Support saving entries as unpublished drafts.
- Support publishing and unpublishing.
- Support editing existing entries.
- Include form validation.
- Provide save confirmation and error feedback.
- Simulate automatic chunking and embedding status for published or updated entries.

**Output:** Complete knowledge creation and editing workflow.

## Phase 08 — Integration and State Management

Prepare the frontend for backend integration.

- Centralize mock data and application state.
- Define TypeScript interfaces for knowledge entries, chat messages, sources, and users.
- Separate UI components from data-handling logic.
- Prepare API service functions for future FastAPI integration.
- Ensure knowledge publishing and editing update the dashboard state.
- Ensure chat interactions use consistent response and source structures.
- Avoid unnecessary backend implementation.

**Output:** Structured frontend ready for API integration.

## Phase 09 — UI/UX Refinement and Testing

Review and refine the entire application.

- Ensure consistent typography, spacing, colors, and component styling.
- Verify desktop, tablet, and mobile responsiveness.
- Test all navigation and interactive elements.
- Test forms, validation, loading, empty, and error states.
- Check administrator route protection.
- Remove unused components, placeholder content, and unnecessary UI.
- Fix TypeScript errors and browser console errors.
- Verify all defined user flows from beginning to end.

**Output:** Polished, responsive, and functional CampusQuery frontend MVP.

---

## Final Expected Application

### Public Pages
1. Landing Page
2. AI Assistant

### Administrator Pages
3. Admin Login
4. Knowledge Dashboard
5. Knowledge Editor

### Core User Flows

**Student:** Landing Page → AI Assistant → Ask Question → View Answer → Inspect Sources → Continue / New Conversation.

**Administrator:** Admin Login → Knowledge Dashboard → Add / Edit Knowledge → Save / Publish → Dashboard.

## Important Implementation Constraint

This development roadmap is frontend-focused. Do not assume a working LLM, RAG pipeline, database, or embedding service exists.

Use realistic mock data and simulated interactions until the backend is available. Keep the frontend architecture ready for eventual integration with FastAPI, Supabase PostgreSQL, pgvector, and hosted AI APIs.