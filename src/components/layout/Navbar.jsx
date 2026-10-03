import { ChevronDown } from 'lucide-react'
import { NavLink } from 'react-router'
import { Container } from '@/components/ui/Container'
import { useMenuDesplegable } from '@/hooks/useMenuDesplegable'
import { SECCIONES_ESCRITORIO, SECCIONES_MAS_ESCRITORIO } from '@/lib/navegacion'
import { Logo } from './Logo'

const claseEnlace = ({ isActive }) =>
  `relative rounded-full px-3 py-2 font-display text-[1.05rem] font-semibold tracking-wide uppercase transition ${
    isActive ? 'bg-white/10 text-white' : 'text-morado-200 hover:text-white'
  }`

/** Barra superior. En celular y tablet solo muestra el logo; el menú va abajo (MobileNav). */
export function Navbar() {
  const { abierto, alternar, cerrar, ref } = useMenuDesplegable()

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-noche-950/95 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Logo />

        <nav aria-label="Principal" className="hidden items-center gap-1 lg:flex">
          {SECCIONES_ESCRITORIO.map((seccion) => (
            <NavLink
              key={seccion.ruta}
              to={seccion.ruta}
              end={seccion.ruta === '/'}
              className={claseEnlace}
            >
              {seccion.nombre}
            </NavLink>
          ))}

          <div ref={ref} className="relative">
            <button
              type="button"
              onClick={alternar}
              aria-expanded={abierto}
              aria-haspopup="true"
              className="flex items-center gap-1 rounded-full px-3 py-2 font-display text-[1.05rem] font-semibold tracking-wide text-morado-200 uppercase transition hover:text-white"
            >
              Más
              <ChevronDown
                className={`size-4 transition ${abierto ? 'rotate-180' : ''}`}
                aria-hidden="true"
              />
            </button>

            {abierto && (
              <div className="absolute right-0 mt-2 w-64 overflow-hidden rounded-2xl border border-white/10 bg-noche-900 p-2 shadow-2xl">
                {SECCIONES_MAS_ESCRITORIO.map(({ ruta, nombre, icono: Icono, descripcion }) => (
                  <NavLink
                    key={ruta}
                    to={ruta}
                    onClick={cerrar}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-xl p-2.5 transition ${
                        isActive ? 'bg-white/10' : 'hover:bg-white/5'
                      }`
                    }
                  >
                    <span className="grid size-9 place-items-center rounded-lg bg-fucsia-500/15 text-fucsia-300">
                      <Icono className="size-5" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-white">{nombre}</span>
                      <span className="block text-xs text-morado-200">{descripcion}</span>
                    </span>
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        </nav>
      </Container>
    </header>
  )
}
