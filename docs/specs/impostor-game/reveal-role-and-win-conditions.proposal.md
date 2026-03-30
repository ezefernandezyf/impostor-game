# Proposal: Reveal role gating + win conditions + setup persistence + UI refactor

## Context
El juego tiene un flujo de reveal de rol inmediato, reglas de victoria incompletas post-voto, y el setup obliga a reingresar datos (jugadores y listas custom) cada vez. Además, el Setup renderiza inputs fijos independientemente de `playerCount`.

## Goals
- Reveal/roles: mostrar primero **solo** el nombre del jugador y un CTA para revelar el rol.
- Victoria post-voto: corregir condición de victoria de impostores y de jugadores normales.
- Persistencia setup: persistir jugadores y listas custom en storage existente y precargar defaults.
- Setup UI: renderizar inputs de nombres en función de `playerCount`.
- Refactor de diseño: mejorar layout/estética usando componentes/tokens existentes, sin features nuevas.

## Non-goals
- No agregar pantallas nuevas ni pasos extra fuera de lo pedido.
- No cambiar el sistema de theming ni introducir colores/fonts/tokens nuevos.
- No cambiar el modelo de dominio más allá de lo necesario para soportar estas reglas y persistencias.

## Approach (high-level)
- Implementar estado local en Reveal para “gated reveal”.
- Cambiar la función de dominio que resuelve ganador en base a conteos vivos.
- Extender storage existente (localStorage adapter) para guardar/recuperar setup defaults.
- Ajustar SetupScreen para mapear inputs según `playerCount`.
- Refactor visual: unificar layout con `Card`, spacing, jerarquía tipográfica y consistencia de acciones.

## Definition of Done
- Reveal: antes de apretar el botón, no aparece rol/palabra; impostor en rojo con token existente.
- Reglas de victoria: impostores ganan cuando impostores vivos == no-impostores vivos; jugadores ganan cuando impostores vivos == 0.
- Setup persiste y precarga players + listas custom (multi-word phrases).
- Setup muestra exactamente `playerCount` inputs.
- Tests cubren nuevas reglas y el gating del reveal.
- `npm test` y `npm run lint` pasan (sin build).
