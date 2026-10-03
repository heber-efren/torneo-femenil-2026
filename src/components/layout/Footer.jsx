import { LockKeyhole } from 'lucide-react'
import { Link } from 'react-router'
import { Container } from '@/components/ui/Container'
import { SECCIONES } from '@/lib/navegacion'
import { NOMBRE_COMPLETO, TORNEO } from '@/lib/torneo'
import { Emblema } from './Logo'

// pb-barra-movil deja espacio para la barra inferior del celular.
export function Footer() {
  return (
    <footer className="bg-noche-950 pb-barra-movil text-morado-200 lg:pb-0">
      <div
        aria-hidden="true"
        className="h-1.5 bg-linear-to-r from-morado-500 via-fucsia-500 to-cancha-400"
      />
      <Container className="grid gap-8 py-10 sm:grid-cols-[1fr_auto]">
        <div>
          <div className="flex items-center gap-3">
            <Emblema className="size-12" />
            <div>
              <p className="font-display text-2xl font-extrabold tracking-wide text-white uppercase">
                {NOMBRE_COMPLETO}
              </p>
              <p className="text-sm">Comunidad de {TORNEO.comunidad}</p>
            </div>
          </div>
          <p className="mt-4 max-w-sm text-sm">
            Sitio oficial del torneo comunitario de fútbol femenil. Calendario, resultados y
            estadísticas actualizadas por la organización.
          </p>
        </div>

        <nav aria-label="Secciones del sitio">
          <ul className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm sm:grid-cols-3">
            {SECCIONES.map(({ ruta, nombre }) => (
              <li key={ruta}>
                <Link to={ruta} className="transition hover:text-white">
                  {nombre}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
      <div className="border-t border-white/10">
        <Container className="flex flex-wrap items-center justify-between gap-2 py-4 text-xs">
          <p>
            © {TORNEO.anio} {NOMBRE_COMPLETO} · {TORNEO.comunidad}
          </p>
          <Link to="/admin" className="inline-flex items-center gap-1 transition hover:text-white">
            <LockKeyhole className="size-3.5" aria-hidden="true" />
            Administración
          </Link>
        </Container>
      </div>
    </footer>
  )
}
