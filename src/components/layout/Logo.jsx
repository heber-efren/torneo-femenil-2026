import { useId } from 'react'
import { Link } from 'react-router'
import { TORNEO } from '@/lib/torneo'

/** Emblema del torneo + nombre. Enlaza al inicio. */
export function Logo({ onClick }) {
  return (
    <Link
      to="/"
      onClick={onClick}
      className="group flex shrink-0 items-center gap-2.5 whitespace-nowrap"
      aria-label="Ir al inicio"
    >
      <Emblema className="size-10 shrink-0 transition group-hover:rotate-[-6deg]" />
      <span className="leading-none">
        <span className="block font-display text-xl font-extrabold tracking-wide text-white uppercase">
          {TORNEO.nombre} <span className="text-fucsia-400">{TORNEO.anio}</span>
        </span>
        <span className="block text-[0.7rem] font-semibold tracking-[0.25em] text-morado-200 uppercase">
          {TORNEO.comunidad}
        </span>
      </span>
    </Link>
  )
}

/** Escudo del torneo dibujado en SVG (mismo diseño que el favicon). */
export function Emblema({ className = '' }) {
  // id único para que varios emblemas en la misma página no choquen
  const idDegradado = useId()
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={idDegradado} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7c3aed" />
          <stop offset="1" stopColor="#ec1c84" />
        </linearGradient>
      </defs>
      <path d="M32 3 56 11v20c0 15-10 25-24 30C18 56 8 46 8 31V11Z" fill={`url(#${idDegradado})`} />
      <path
        d="M32 3 56 11v20c0 15-10 25-24 30C18 56 8 46 8 31V11Z"
        fill="none"
        stroke="#fff"
        strokeOpacity=".35"
        strokeWidth="2"
      />
      <circle cx="32" cy="30" r="12" fill="#fff" />
      <path d="m32 23 6.6 4.8-2.5 7.8h-8.2l-2.5-7.8Z" fill="#14061f" />
      <path
        d="M32 18v5m6.6 4.8 5-2m-7.5 9.8 3 4.4m-11.2-4.4-3 4.4m.5-12.2-5-2"
        stroke="#14061f"
        strokeWidth="1.6"
      />
      <path d="M18 50h28" stroke="#4fe07c" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}
