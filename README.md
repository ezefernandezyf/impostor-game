# Impostor Game

Impostor Game is a social deduction party game built as a single-page application with React 19 and Vite.

The project follows a spec-driven workflow and keeps the game logic separated from the UI. The current scaffold includes the application shell, domain model, storage adapters, and screen-level feature folders for the main game flow.

## Tech Stack

- React 19
- Vite
- TypeScript
- Tailwind CSS 4
- Zod
- react-hook-form
- react-router-dom
- Vitest
- Testing Library

## Project Structure

- `src/components/` - Presentational UI components
- `src/features/` - Screen-level features and game flow containers
- `src/domain/` - Game rules, types, schemas, and reducer logic
- `src/lib/` - Shared utilities and persistence adapters
- `src/app/` - Application shell and router

## Available Scripts

- `npm run dev` - Start the Vite development server
- `npm run build` - Build the production bundle
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint
- `npm run test` - Run the test suite once
- `npm run test:watch` - Run tests in watch mode

## Getting Started

1. Install dependencies.
2. Start the development server with `npm run dev`.
3. Open the app in the browser and begin with the setup screen.

## Current Status

The repository currently contains the initial scaffold for the game. The first implementation phase is expected to build the setup, reveal, clue round, voting, and result flow on top of the existing domain layer.

## Conventions

- Commit and pull request titles must be written in English.
- Commit and pull request descriptions must be written in Spanish.
- Push changes after relevant commits so the repository stays synchronized with GitHub.
- Keep this README updated as the project grows so onboarding stays accurate.
- Maintain strict separation between UI components and feature logic.

## Repository

- Main remote: https://github.com/ezefernandezyf/impostor-game
