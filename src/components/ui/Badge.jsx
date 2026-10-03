const TONOS = {
  morado: 'bg-morado-100 text-morado-700',
  fucsia: 'bg-fucsia-500/10 text-fucsia-600',
  cancha: 'bg-cancha-400/15 text-cancha-500',
  oscuro: 'bg-white/10 text-white',
}

/** Etiqueta pequeña: estado de un partido, posición de una jugadora, etc. */
export function Badge({ tono = 'morado', className = '', children }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-wide uppercase ${TONOS[tono]} ${className}`}
    >
      {children}
    </span>
  )
}
