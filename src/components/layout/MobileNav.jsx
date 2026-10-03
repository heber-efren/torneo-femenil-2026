import { LayoutGrid, X } from 'lucide-react'
import { NavLink } from 'react-router'
import { useMenuDesplegable } from '@/hooks/useMenuDesplegable'
import { SECCIONES, SECCIONES_MOVIL } from '@/lib/navegacion'

/** Barra de navegación fija en la parte inferior (celular y tablet). */
export function MobileNav() {
  const { abierto, alternar, cerrar, ref } = useMenuDesplegable()

  return (
    <div ref={ref} className="lg:hidden">
      {/* Panel "Más" con todas las secciones */}
      {abierto && (
        <>
          <div
            aria-hidden="true"
            className="fixed inset-0 z-40 bg-noche-950/60 backdrop-blur-sm"
            onClick={cerrar}
          />
          <div
            id="menu-mas"
            role="dialog"
            aria-label="Todas las secciones"
            className="fixed inset-x-0 bottom-0 z-50 rounded-t-3xl bg-noche-900 px-4 pt-4 pb-[calc(6rem+env(safe-area-inset-bottom))] text-white shadow-2xl"
          >
            <div className="mb-4 flex items-center justify-between">
              <p className="font-display text-2xl font-bold tracking-wide uppercase">Secciones</p>
              <button
                type="button"
                onClick={cerrar}
                className="grid size-10 place-items-center rounded-full bg-white/10"
                aria-label="Cerrar menú"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>
            <nav aria-label="Todas las secciones" className="grid grid-cols-3 gap-2 sm:grid-cols-4">
              {SECCIONES.map(({ ruta, nombre, icono: Icono }) => (
                <NavLink
                  key={ruta}
                  to={ruta}
                  end={ruta === '/'}
                  onClick={cerrar}
                  className={({ isActive }) =>
                    `flex flex-col items-center gap-1.5 rounded-2xl p-3 text-center text-xs font-semibold transition ${
                      isActive
                        ? 'bg-fucsia-500 text-white'
                        : 'bg-white/5 text-morado-100 active:bg-white/10'
                    }`
                  }
                >
                  <Icono className="size-6" aria-hidden="true" />
                  {nombre}
                </NavLink>
              ))}
            </nav>
          </div>
        </>
      )}

      {/* Barra inferior */}
      <nav
        aria-label="Principal"
        className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-noche-950/95 pb-[env(safe-area-inset-bottom)] backdrop-blur"
      >
        <ul className="mx-auto grid max-w-lg grid-cols-5">
          {SECCIONES_MOVIL.map(({ ruta, nombre, icono: Icono }) => (
            <li key={ruta}>
              <NavLink
                to={ruta}
                end={ruta === '/'}
                onClick={cerrar}
                className={({ isActive }) =>
                  `flex h-16 flex-col items-center justify-center gap-1 text-[0.7rem] font-semibold transition ${
                    isActive ? 'text-fucsia-400' : 'text-morado-200'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={`grid h-7 w-12 place-items-center rounded-full transition ${
                        isActive ? 'bg-fucsia-500/15' : ''
                      }`}
                    >
                      <Icono className="size-5" aria-hidden="true" />
                    </span>
                    {nombre}
                  </>
                )}
              </NavLink>
            </li>
          ))}
          <li>
            <button
              type="button"
              onClick={alternar}
              aria-expanded={abierto}
              aria-controls="menu-mas"
              className={`flex h-16 w-full flex-col items-center justify-center gap-1 text-[0.7rem] font-semibold transition ${
                abierto ? 'text-fucsia-400' : 'text-morado-200'
              }`}
            >
              <span
                className={`grid h-7 w-12 place-items-center rounded-full ${abierto ? 'bg-fucsia-500/15' : ''}`}
              >
                <LayoutGrid className="size-5" aria-hidden="true" />
              </span>
              Más
            </button>
          </li>
        </ul>
      </nav>
    </div>
  )
}
