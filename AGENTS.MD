## Purpose

This document defines the engineering standards, architecture guidelines, testing requirements, and development principles for all contributors and AI agents working on this React application.

The goal is to maintain:

* High-quality, maintainable code
* Consistent architecture
* Predictable behavior
* Strong test coverage
* Fast development velocity
* Long-term sustainability

---

# Core Principles

## 1. Simplicity First

Prefer the simplest solution that satisfies the requirements.

Avoid:

* Premature optimization
* Excessive abstractions
* Deep inheritance chains
* Over-engineered patterns
* Unnecessary custom frameworks

Use abstractions only when they provide clear value.

---

## 2. Readability Over Cleverness

Code should be understandable by any engineer joining the project.

Prioritize:

* Clear naming
* Small functions
* Explicit behavior
* Predictable data flow

Avoid:

* Hidden side effects
* Clever one-liners
* Complex nesting
* Magic values

---

## 3. Consistency Over Preference

Follow established project conventions.

When multiple valid approaches exist:

* Prefer the existing pattern
* Maintain consistency across the codebase

---

## 4. Enterprise Grade, Not Enterprise Complex

Build solutions that are:

* Reliable
* Testable
* Maintainable
* Observable

Do not introduce complexity solely for perceived scalability.

---

# Technology Standards

## React

Preferred:

* Functional components
* Hooks
* Composition over inheritance
* Controlled components where appropriate

Avoid:

* Class components
* Legacy React APIs
* Excessive prop drilling
* Business logic inside JSX

---

## TypeScript

All code must be written in TypeScript.

Requirements:

* Strict mode enabled
* Explicit types for public APIs
* Avoid `any`
* Prefer type inference internally
* Use discriminated unions where appropriate

Avoid:

```ts
any
as unknown as
```

Prefer:

```ts
type
interface
readonly
```

---

# Component Guidelines

## Component Responsibilities

A component should ideally have one responsibility.

Avoid:

* Fetching data
* Managing complex business rules
* Rendering large UI trees

inside the same component.

---

## Component Size

Preferred:

* Under 200 lines

Review carefully:

* Over 300 lines

Refactor:

* Over 500 lines

---

## Props

Keep props minimal and explicit.

Good:

```ts
interface UserCardProps {
  user: User;
  onEdit(): void;
}
```

Avoid:

```ts
interface UserCardProps {
  data: any;
}
```

---

## State Management

Use the simplest state solution possible.

Order of preference:

1. Local component state
2. Context (small scope)
3. Feature state store
4. Global state

Avoid global state unless multiple domains require it.

---

# Hooks

## Custom Hooks

Use hooks to encapsulate:

* Reusable state logic
* API interaction
* Feature workflows

Example:

```ts
function useUserProfile(userId: string) {
  // logic
}
```

---

## Hook Rules

Never:

* Call hooks conditionally
* Call hooks in loops
* Call hooks in nested functions

Follow React hook rules strictly.

---

# API Layer

## Separation of Concerns

UI components must not directly manage API implementation details.

Preferred:

```text
Component
  ↓
Hook
  ↓
Service
  ↓
API Client
```

---

## API Clients

All HTTP communication should be centralized.

Example:

```ts
apiClient.get('/users');
```

Avoid:

```ts
fetch(...)
axios(...)
```

scattered across components.

---

# Error Handling

All asynchronous operations must handle:

* Loading state
* Error state
* Success state

Never silently swallow errors.

Bad:

```ts
try {
  ...
} catch {}
```

Good:

```ts
try {
  ...
} catch (error) {
  logger.error(error);
}
```

---

# Forms

Use:

* Schema validation
* Typed form models

Validation should exist:

* Client-side
* Server-side

Never trust client validation alone.

---

# Styling

Preferred:

* Design system components
* Consistent spacing scale
* Theme-based colors

Avoid:

* Inline styles
* Magic pixel values
* Hardcoded colors

Prefer tokens:

```ts
spacing.md
colors.primary
```

---

# Accessibility

Accessibility is mandatory.

Requirements:

* Semantic HTML
* Keyboard navigation
* Accessible labels
* Focus management
* Color contrast compliance

Test using:

* Screen readers
* Keyboard-only navigation

---

# Performance

Optimize only when measurable.

Preferred:

* Lazy loading
* Route splitting
* Memoization when justified

Avoid:

* Premature optimization
* Blanket useMemo/useCallback

Every optimization should solve a real issue.

---

# Security

Never:

* Store secrets in frontend code
* Trust client-side authorization
* Expose sensitive tokens

Always:

* Sanitize user input
* Validate API responses
* Follow least-privilege principles

---

# Logging & Monitoring

Use structured logging.

Log:

* Errors
* Critical user actions
* Important business events

Do not log:

* Passwords
* Tokens
* Personal sensitive information

---

# Testing Strategy

Testing is mandatory.

---

## Unit Tests

Purpose:

Verify isolated logic.

Examples:

* Utility functions
* Hooks
* Reducers
* Services

Requirements:

* Fast
* Deterministic
* No network calls

Recommended coverage:

* 90%+ critical logic

Example:

```ts
describe('calculatePrice', () => {
  it('applies discount correctly', () => {
    ...
  });
});
```

---

## Integration Tests

Purpose:

Verify collaboration between modules.

Examples:

* Component + API mock
* Form submission flow
* Feature workflows

Requirements:

* Test user behavior
* Avoid implementation details

Preferred tools:

* React Testing Library
* Mock Service Worker (MSW)

Test:

* Happy paths
* Error paths
* Edge cases

---

## Mutation Testing

Mutation testing is required for critical business logic.

Purpose:

Verify test quality rather than code coverage.

Recommended tool:

```text
Stryker
```

Requirements:

* Mutation score ≥ 80%
* Critical domains ≥ 90%

If mutants survive:

* Improve tests
* Do not simply increase coverage

---

## End-to-End Tests

Critical user journeys must be covered.

Examples:

* Authentication
* Checkout
* User onboarding
* Data creation workflows

Recommended:

```text
Playwright
```

Focus on:

* Business-critical paths
* Cross-browser confidence

Avoid excessive E2E coverage.

---

# Test Pyramid

Follow:

```text
         E2E
        /   \
 Integration
      /     \
     Unit
```

Target:

* 70% Unit
* 20% Integration
* 10% E2E

# Agent Instructions

When generating code:

1. Follow existing project conventions.
2. Prefer simple solutions.
3. Write TypeScript-first code.
4. Include tests for new functionality.
5. Include integration tests for user workflows.
6. Consider mutation resistance when writing tests.
7. Avoid unnecessary abstractions.
8. Keep components focused and small.
9. Prioritize readability and maintainability.
10. Produce production-ready code.