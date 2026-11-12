# CampusQuery — Design & UX Guidelines

## 1. Design Philosophy

Build CampusQuery as a clean, modern, trustworthy college information platform.

The interface should feel like a carefully designed software product, not a generic AI-generated dashboard.

Prioritize:
- Clarity over decoration.
- Functionality over visual complexity.
- Content over unnecessary UI elements.
- Consistency over excessive customization.
- Simplicity without sacrificing usability.

Every component must serve a clear user purpose.

## 2. Existing Design System

The project already has a configured shadcn/ui theme.

**Do not replace or redesign it.**

Requirements:
- Preserve existing theme variables and color tokens.
- Preserve existing typography and font configuration.
- Follow the existing border, radius, and component styling.
- Reuse installed shadcn/ui components.
- Use existing Tailwind conventions.
- Do not introduce another UI library or design system.
- Do not override global styles without a clear reason.

Before creating a component, inspect whether an existing shadcn/ui component can fulfill the requirement.

## 3. Visual Design Principles

### Layout and Spacing
- Use consistent spacing and alignment.
- Establish clear visual hierarchy through size, weight, and spacing.
- Avoid unnecessary containers and nested layouts.
- Use available screen space efficiently.
- Keep content widths readable.
- Avoid excessive whitespace that makes interfaces feel empty.
- Avoid overcrowding interfaces with too many elements.

### Typography
- Use typography to establish hierarchy.
- Keep headings concise and meaningful.
- Use readable text sizes and line heights.
- Avoid excessive font weights and text styles.
- Do not use multiple paragraphs when one concise explanation is sufficient.

### Colors
- Follow the existing theme.
- Use semantic colors consistently.
- Maintain sufficient contrast.
- Avoid introducing unnecessary accent colors.

### Components
- Use components only when they improve usability or establish meaningful structure.
- Prefer simple layouts over unnecessary cards.
- Avoid wrapping every section or piece of information in a card.
- Avoid excessive badges, icons, separators, and decorative elements.
- Do not duplicate information across multiple components.

## 4. Strictly Avoid AI-Generated UI Patterns

Do not introduce the following unless there is a strong functional reason:

- Unnecessary cards surrounding every section.
- Decorative gradient backgrounds.
- Purple-blue gradients and glowing effects.
- Glassmorphism and blurred decorative backgrounds.
- Excessive rounded containers and pill-shaped elements.
- Random floating icons and decorative illustrations.
- Unnecessary badges and status labels.
- Repeated headings and descriptions.
- Excessive explanatory text.
- Multiple containers nested inside one another.
- Empty dashboard sections that only exist for decoration.
- Unnecessary charts and statistics.
- Generic AI-generated hero sections.
- Icons accompanying every text label.
- Animations that do not improve interaction.

**Important:** Do not add UI elements simply to make the page look more complete.

## 5. UX Principles

### Navigation
- Keep navigation predictable and consistent.
- Make primary actions easy to identify.
- Avoid unnecessary navigation items.
- Clearly distinguish public and administrator navigation.

### Interaction
- Every interactive element must have a meaningful action.
- Provide visible hover, focus, active, disabled, and loading states where appropriate.
- Prevent accidental duplicate submissions.
- Give users clear feedback after important actions.
- Use confirmation dialogs only for destructive or consequential actions.

### Forms
- Use clear and descriptive labels.
- Provide helpful validation messages.
- Group related fields logically.
- Avoid unnecessary input fields.
- Keep primary submission actions visible.
- Preserve entered data when validation fails.

### Responsiveness
- Design mobile-first while supporting desktop layouts.
- Ensure navigation and interactions work on smaller screens.
- Avoid horizontal overflow.
- Keep buttons and input controls comfortable to interact with.
- Adapt layouts based on available screen space rather than simply shrinking desktop elements.

### Accessibility
- Use semantic HTML.
- Provide keyboard navigation.
- Maintain sufficient color contrast.
- Associate labels with form controls.
- Provide accessible names for icon-only buttons.
- Do not communicate important states through color alone.

## 6. Page-Specific UX Guidelines

### A. Landing Page

Goal: Help visitors understand CampusQuery and access the assistant immediately.

- Communicate the product's purpose clearly.
- Make Ask AI the primary action.
- Keep the introduction concise.
- Show a few relevant example questions.
- Avoid oversized decorative hero sections.
- Avoid unnecessary feature cards and marketing content.

### B. AI Assistant

Goal: Make asking and understanding college-related questions effortless.

- Prioritize the conversation area.
- Keep the message input easy to find and access.
- Provide useful suggested questions when no conversation exists.
- Clearly distinguish student messages from AI responses.
- Use readable response formatting.
- Display source references directly below the relevant answer.
- Make source details inspectable without disrupting the conversation.
- Provide clear loading and fallback states.
- Keep New Conversation accessible but secondary.
- Preserve conversation context during the current session.

The assistant should feel like an information tool, not a generic chatbot template.

### C. Admin Login

Goal: Provide a simple and secure administrator entry point.

- Keep the login interface focused.
- Use a straightforward form layout.
- Avoid unnecessary promotional content.
- Provide clear validation and error feedback.

### D. Knowledge Dashboard

Goal: Help administrators manage college information efficiently.

- Prioritize the knowledge entries list.
- Make search and category filtering accessible.
- Show publication status clearly.
- Keep Add Knowledge as the primary action.
- Use compact and readable entry rows or tables.
- Use statistics only when they provide useful information.
- Avoid unnecessary dashboard cards and charts.

### E. Knowledge Editor

Goal: Make creating and maintaining knowledge entries straightforward.

- Prioritize the title and content fields.
- Keep category selection accessible.
- Clearly distinguish Save Draft, Publish, and Unpublish actions.
- Show publication status.
- Provide validation and save feedback.
- Avoid unnecessary multi-step forms.

## 7. Reusable Component Guidelines

Create reusable components when:
- The same UI pattern appears across multiple pages.
- A component has a clear independent responsibility.
- Reuse improves consistency and maintainability.

Avoid:
- Creating components for trivial one-line elements without a reuse benefit.
- Excessive component fragmentation.
- Duplicating existing shadcn/ui components.
- Passing excessive props through deeply nested components.
- Creating abstractions that make simple UI harder to understand.

Keep components focused and appropriately sized.

## 8. Content and Microcopy

- Use simple, natural, user-friendly English.
- Avoid overly technical language in student-facing interfaces.
- Keep labels short and descriptive.
- Avoid generic AI phrases and unnecessary conversational filler.
- Use consistent terminology throughout the application.
- Never display placeholder text as if it were actual college information.

Examples:

Prefer: "Ask a question about enrollment."

Avoid: "Unlock the power of intelligent knowledge discovery."

Prefer: "No matching information found."

Avoid: "Oops! Our AI couldn't find the magical answer you're looking for."

## 9. Final Quality Checklist

Before completing any page or feature, verify:

- [ ] Existing shadcn/ui theme is preserved.
- [ ] Layout has clear visual hierarchy.
- [ ] Every component serves a purpose.
- [ ] No unnecessary cards or decorative elements.
- [ ] No unnecessary gradients, glows, or effects.
- [ ] Typography and spacing are consistent.
- [ ] Primary actions are easy to identify.
- [ ] Interactive elements work correctly.
- [ ] Loading, empty, and error states are considered.
- [ ] Responsive behavior is verified.
- [ ] Accessibility basics are addressed.
- [ ] No redundant content or duplicated components.

## 10. Final Design Standard

The best CampusQuery interface is not the one with the most components or visual effects.

It is the one that allows students to find trustworthy college information with minimal effort and allows administrators to maintain that information efficiently.

**Design with intention. Remove what is unnecessary. Preserve what works.**