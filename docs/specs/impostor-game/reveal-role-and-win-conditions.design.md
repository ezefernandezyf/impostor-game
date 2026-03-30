# Design: Reveal gating + win conditions + setup persistence

## Architecture / Placement
- **Dominio**: la lógica de victoria vive en `src/domain/game/rules.ts` (o equivalente). Debe ser pura y testeable.
- **Persistencia**: usar `src/lib/storage/` y el adaptador existente para leer/escribir defaults de setup.
- **UI**:
  - Reveal: estado local UI para "reveal gated".
  - Setup: derivar inputs desde `playerCount` y defaults recuperados.

## Data Model

### Setup Defaults (persisted)
- `playerNames: string[]`
- `customPhrases: string[]` (multi-word phrases)

Se persiste como JSON en localStorage a través del adaptador existente. Validación con Zod donde sea consistente con el patrón actual.

## UI / Design Direction (within existing tokens)
- Mantener componentes existentes (`Card`, `Button`, `Input`, `Select`).
- Mejorar jerarquía visual con:
  - títulos/subtítulos consistentes,
  - spacing vertical coherente,
  - acciones principales claras.
- Para el impostor usar clase/token existente para rojo (p. ej. `text-red-...` si ya existe o el token de “destructive” si el sistema lo provee). No introducir nuevos colores.

## Edge cases
- `playerCount` menor que la cantidad de nombres persistidos: truncar lista.
- `playerCount` mayor que la lista persistida: completar con strings vacíos.
- Defaults corruptos en storage: fallback a defaults actuales sin romper UI.

