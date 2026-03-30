# Spec: Reveal role gating + win conditions + setup persistence + setup UI

## Functional Requirements

### FR1 — Reveal/roles gating
- Al entrar a Reveal para un jugador, se debe ver **solo** el nombre del jugador (p. ej. "ezequiel").
- Debe existir un botón explícito: "Ver rol" (o equivalente).
- El rol/palabra se revela **únicamente** luego de apretar el botón.
- Si el rol es impostor, el texto "Impostor" se renderiza en rojo usando tokens/estilos existentes (sin crear theme nuevo).

### FR2 — Victoria post-voto
- Los impostores ganan cuando:
  - `impostorsAlive == nonImpostorsAlive`.
  - Ejemplos: 1v1, 2v2, 3v3, etc.
  - Si cambia la cantidad de impostores (por eliminación) la condición se evalúa con los vivos actuales.
- Los jugadores normales ganan cuando:
  - `impostorsAlive == 0`.

### FR3 — Persistencia de setup
- Persistir en storage existente (localStorage o adaptador actual):
  - nombres de jugadores,
  - listas personalizadas (phrases multi-palabra).
- En Setup, precargar defaults desde storage si existen.
- Persistir cambios cuando el usuario guarda/inicia partida (o en un punto equivalente del flujo actual).

### FR4 — Setup UI dinámica por `playerCount`
- El render de inputs de nombres debe depender de `playerCount`.
- Si `playerCount = 5`, deben renderizarse 5 inputs (no 20).

### FR5 — Refactor de diseño (sin features)
- Ajustar layout/estilo/componentización en pantallas afectadas (Setup/Reveal principalmente, y donde sea necesario para consistencia), usando componentes existentes.
- Prohibido agregar nuevas features, pantallas, filtros, modals, etc.

## Scenarios (Acceptance)

### S1 — Reveal gating
Given una sesión con jugador "Ana" y rol normal
When se renderiza Reveal
Then se ve "Ana" y un botón "Ver rol"
And NO se ve la palabra/rol antes del click
When el usuario hace click en "Ver rol"
Then se revela la palabra/rol

### S2 — Reveal impostor styling
Given una sesión con rol impostor
When el usuario revela el rol
Then se ve el texto "Impostor" en rojo (token existente)

### S3 — Win condition impostors
Given un estado post-voto con impostores vivos = 2 y no-impostores vivos = 2
When se resuelve ganador
Then ganador = impostores

### S4 — Win condition crew
Given un estado post-voto con impostores vivos = 0
When se resuelve ganador
Then ganador = crew

### S5 — Setup persistence
Given localStorage con defaults guardados
When se abre Setup
Then los inputs aparecen pre-cargados con esos valores

### S6 — Setup inputs by playerCount
Given `playerCount = 5`
When se renderiza Setup
Then existen exactamente 5 inputs de nombre

## Test Requirements
- Unit tests: reglas de victoria (dominio).
- UI tests mínimos: Reveal gating (antes/después del click) y Setup (cantidad de inputs según playerCount).

