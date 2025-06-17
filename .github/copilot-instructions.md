<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Bounce Travel Search App - Copilot Instructions

This is a React TypeScript travel search web application built with Vite. When working on this project, please follow these guidelines:

## Project Context
- **App Name**: Bounce
- **Purpose**: Travel accommodation search with modern UX
- **Tech Stack**: React 18, TypeScript, Vite, Tailwind CSS, React Router DOM
- **Architecture**: Single-page app with lazy-loaded routes

## Code Style & Patterns
- Use functional components with hooks (no class components)
- Prefer TypeScript interfaces over types for object shapes
- Use React Context for global state management
- Implement proper error boundaries and loading states
- Follow ESM import patterns throughout

## Component Guidelines
- All components should be fully typed with TypeScript
- Use React.FC type for functional components
- Implement proper prop validation with interfaces
- Include loading and error states where appropriate
- Make components responsive with Tailwind classes

## State Management
- Use SearchContext for search-related state
- Implement proper reducers for complex state updates
- Use custom hooks for reusable stateful logic
- Prefer local state over global state when possible

## Styling
- Use Tailwind CSS with dark mode support
- Default to dark mode theme
- Ensure responsive design (mobile-first)
- Use semantic class names and proper accessibility

## Testing
- Write unit tests for utility functions and hooks
- Use Vitest as the test runner
- Mock external dependencies appropriately
- Include both positive and negative test cases

## Performance
- Implement virtual scrolling for large lists
- Use React.lazy for code splitting
- Optimize images with lazy loading
- Debounce user input for API calls

## API Integration
- Use Axios for HTTP requests
- Include proper error handling
- Implement loading states
- Mock data for development

## File Organization
- Keep components in /components directory
- Put page components in /pages directory
- Store utilities in /utils directory
- Place tests adjacent to source files or in /test directory
