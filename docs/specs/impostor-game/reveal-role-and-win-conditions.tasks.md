# Tasks: Reveal gating + win conditions + setup persistence

## 1. Specs (done)
- [x] Proposal
- [x] Spec
- [x] Design
- [x] Tasks

## 2. Domain: win conditions
- [x] Update winner resolution to:
  - impostors win when `impostorsAlive == nonImpostorsAlive`
  - crew wins when `impostorsAlive == 0`
- [x] Update/extend unit tests for rules

## 3. Storage: setup defaults persistence
- [x] Add storage functions for setup defaults (read/write) using existing adapter
- [x] Add Zod schema and safe parsing (fallback on invalid)
- [x] Add tests for persistence

## 4. Setup UI dynamic inputs
- [x] Render player name inputs based on `playerCount`
- [x] Preload defaults (players + custom phrases)
- [x] Ensure save/start flow writes updated defaults
- [x] Add/adjust tests for input count + preload

## 5. Reveal UI gating
- [x] Show only player name initially + "Ver rol" button
- [x] Reveal role/word only after click
- [x] Style impostor text in red using existing tokens
- [x] Add/adjust UI test

## 6. Design refactor (no features)
- [x] Apply layout/spacing consistency to Setup/Reveal (and minimal adjacent screens if needed)
- [x] Keep component usage consistent, no new tokens

## 7. Quality gates
- [x] `npm test`
- [x] `npm run lint`

