import { ArrowRight, CalendarDays, MapPin, Shield } from 'lucide-react'
import { Link } from 'react-router'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { ACCESOS_RAPIDOS } from '@/lib/navegacion'
import { TORNEO } from '@/lib/torneo'

export default function Inicio() {
  return (
    <>
      <Portada />
      <AccesosRapidos />
    </>
  )
}

function Portada() {
  return (
    <section className="relative overflow-hidden bg-noche-950 text-white">
      <LineasCancha />
      <div
        aria-hidden="true"
        className="absolute -top-40 -left-32 size-96 rounded-full bg-morado-600/40 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -right-24 bottom-0 size-80 rounded-full bg-fucsia-500/30 blur-3xl"
      />

      <Container className="relative grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[1.15fr_1fr] lg:py-24">
        <div>
          <Badge tono="oscuro" className="mb-5">
            <span className="size-1.5 rounded-full bg-cancha-400" aria-hidden="true" />
            Comunidad de {TORNEO.comunidad}
          </Badge>
          <h1 className="text-[clamp(3.5rem,14vw,7.5rem)] leading-[0.85] font-extrabold">
            {TORNEO.nombre.split(' ').map((palabra) => (
              <span key={palabra} className="block">
                {palabra}
              </span>
            ))}
            <span className="texto-contorno block italic">{TORNEO.anio}</span>
          </h1>
          <p className="mt-6 max-w-md text-lg text-morado-200">
            {TORNEO.equipos} equipos, una sola corona. Sigue cada jornada, cada gol y cada atajada
            del fútbol femenil de {TORNEO.comunidad}.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button to="/calendario" tamano="lg">
              Ver calendario
              <ArrowRight className="size-5" aria-hidden="true" />
            </Button>
            <Button to="/tabla" variante="contorno" tamano="lg" className="text-white">
              Tabla de posiciones
            </Button>
          </div>
        </div>

        <ProximoPartido />
      </Container>
      <div
        aria-hidden="true"
        className="h-1.5 bg-linear-to-r from-morado-500 via-fucsia-500 to-cancha-400"
      />
    </section>
  )
}

/** Tarjeta del próximo partido. En la Fase 8 tomará los datos reales del calendario. */
function ProximoPartido() {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur sm:p-6">
      <div className="flex items-center justify-between">
        <p className="font-display text-lg font-bold tracking-widest text-fucsia-300 uppercase">
          Próximo partido
        </p>
        <Badge tono="oscuro">Jornada 1</Badge>
      </div>

      <div className="my-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-center">
        <EquipoPorDefinir />
        <span className="font-display text-4xl font-extrabold text-fucsia-400 italic">VS</span>
        <EquipoPorDefinir />
      </div>

      <dl className="grid gap-2 border-t border-white/10 pt-4 text-sm text-morado-200 sm:grid-cols-2">
        <div className="flex items-center gap-2">
          <CalendarDays className="size-4 text-cancha-400" aria-hidden="true" />
          <dt className="sr-only">Fecha</dt>
          <dd>Fecha por anunciar</dd>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="size-4 text-cancha-400" aria-hidden="true" />
          <dt className="sr-only">Campo</dt>
          <dd>Campo por anunciar</dd>
        </div>
      </dl>
    </div>
  )
}

function EquipoPorDefinir() {
  return (
    <div className="flex flex-col items-center gap-2">
      <span className="grid size-16 place-items-center rounded-2xl border-2 border-dashed border-white/25 sm:size-20">
        <Shield className="size-8 text-white/40" aria-hidden="true" />
      </span>
      <span className="font-display text-lg font-bold tracking-wide uppercase">Por definir</span>
    </div>
  )
}

function AccesosRapidos() {
  return (
    <section className="py-10 sm:py-14">
      <Container>
        <h2 className="text-4xl">Explora el torneo</h2>
        <p className="mt-1 text-noche-700/80">Todo lo que necesitas saber, a un toque.</p>

        <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {ACCESOS_RAPIDOS.map(({ ruta, nombre, icono: Icono, descripcion }) => (
            <li key={ruta}>
              <Link
                to={ruta}
                className="group flex h-full flex-col gap-3 rounded-2xl border border-morado-100 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-fucsia-400 hover:shadow-md"
              >
                <span className="grid size-11 place-items-center rounded-xl bg-morado-600 text-white transition group-hover:bg-fucsia-500">
                  <Icono className="size-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block font-display text-xl font-bold tracking-wide uppercase">
                    {nombre}
                  </span>
                  <span className="block text-xs text-noche-700/70">{descripcion}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}

/** Líneas de cancha decorativas (círculo central y área) en la portada. */
function LineasCancha() {
  return (
    <svg
      aria-hidden="true"
      className="absolute top-1/2 right-[-10%] h-[140%] -translate-y-1/2 text-white/[0.07]"
      viewBox="0 0 400 600"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
    >
      <rect x="20" y="20" width="360" height="560" rx="4" />
      <line x1="20" y1="300" x2="380" y2="300" />
      <circle cx="200" cy="300" r="70" />
      <circle cx="200" cy="300" r="5" fill="currentColor" />
      <rect x="110" y="20" width="180" height="90" />
      <rect x="110" y="490" width="180" height="90" />
    </svg>
  )
}
