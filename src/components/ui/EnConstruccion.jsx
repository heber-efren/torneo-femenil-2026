import { Construction } from 'lucide-react'
import { Card } from './Card'
import { Container } from './Container'
import { PageHeader } from './PageHeader'

/**
 * Página provisional para secciones que todavía no se desarrollan.
 * Muestra en qué fase se construirá y qué contendrá.
 */
export function EnConstruccion({ titulo, descripcion, icono, fase, contenido = [] }) {
  return (
    <>
      <PageHeader
        antetitulo="Torneo Femenil 2026"
        titulo={titulo}
        descripcion={descripcion}
        icono={icono}
      />
      <Container className="py-8 sm:py-12">
        <Card className="mx-auto max-w-2xl">
          <div className="flex items-start gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-fucsia-500/10 text-fucsia-500">
              <Construction className="size-6" aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-2xl">Sección en construcción</h2>
              <p className="mt-1 text-sm text-noche-700/80">
                Esta sección se desarrollará en la <strong>Fase {fase}</strong>.
              </p>
            </div>
          </div>
          {contenido.length > 0 && (
            <>
              <p className="mt-6 text-sm font-semibold text-noche-800">Aquí podrás ver:</p>
              <ul className="mt-2 grid gap-2 sm:grid-cols-2">
                {contenido.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-noche-700">
                    <span
                      className="size-1.5 shrink-0 rounded-full bg-cancha-400"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </>
          )}
        </Card>
      </Container>
    </>
  )
}
