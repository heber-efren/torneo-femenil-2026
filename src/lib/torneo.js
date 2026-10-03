// Datos fijos del torneo mientras no exista la base de datos.
// En la Fase 1 estos valores se guardarán en la tabla "torneo" de Supabase
// y el administrador podrá editarlos desde el panel.

export const TORNEO = {
  nombre: 'Torneo Femenil',
  anio: 2026,
  comunidad: 'X-Yatil',
  equipos: 6,
}

export const NOMBRE_COMPLETO = `${TORNEO.nombre} ${TORNEO.anio}`

// Reglas de competencia acordadas con la organización.
export const REGLAS = {
  formato: [
    'Fase regular: todos contra todos a una vuelta.',
    '6 equipos, 5 jornadas y 15 partidos.',
    'Final a partido único: 1.º lugar contra 2.º lugar de la fase regular.',
    'Si la final termina empatada, se define directamente en tanda de penales.',
  ],
  puntos: [
    { resultado: 'Victoria', puntos: 3 },
    { resultado: 'Empate', puntos: 1 },
    { resultado: 'Derrota', puntos: 0 },
  ],
  desempates: ['Diferencia de goles', 'Goles a favor', 'Enfrentamiento directo', 'Sorteo'],
  notas: [
    'La final no modifica la tabla de posiciones de la fase regular.',
    'Los goles y asistencias de la final sí cuentan para la tabla de goleadoras y las estadísticas individuales.',
  ],
}
