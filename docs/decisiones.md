# Decisiones del proyecto

Registro de lo acordado con la organización. Si una regla cambia, se actualiza aquí primero.

## Competencia

- **Fase regular:** todos contra todos a una vuelta. 6 equipos, 5 jornadas, 15 partidos.
- **Final:** 1.º contra 2.º de la fase regular, a partido único.
  - Si termina empatada en tiempo reglamentario, se define directamente en tanda de penales.
- **Puntos:** victoria 3, empate 1, derrota 0.
- **Desempates (en orden):**
  1. Diferencia de goles
  2. Goles a favor
  3. Enfrentamiento directo (con 3 o más equipos empatados: mini-tabla solo con sus partidos)
  4. Sorteo, registrado por el administrador
- La **final no modifica** la tabla de posiciones de la fase regular.
- Los **goles y asistencias de la final sí cuentan** para goleadoras y estadísticas individuales.
- El formato debe quedar **configurable** (tabla `fases`) para cambiarlo después sin reescribir código.

## Captura por partido

Se registra en cada partido:

- Alineación de cada equipo, indicando quién fue la portera.
- Goles: goleadora, asistente (opcional), minuto (opcional) y si fue autogol.

Con esto se calculan partidos jugados y porterías en cero.

## Técnicas

- JavaScript (no TypeScript).
- Un solo administrador. Registro público desactivado en Supabase Auth.
- Seguridad con Row Level Security: los visitantes solo leen y únicamente el administrador escribe.
- Entrega del código: archivo .zip (opción B). El administrador lo sube a GitHub y Vercel publica.
- Supabase: proyecto `torneo-femenil-2026`, región Canada (Central).
