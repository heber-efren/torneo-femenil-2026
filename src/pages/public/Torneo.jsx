import { Info, ListOrdered, Medal, Trophy } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Container } from '@/components/ui/Container'
import { PageHeader } from '@/components/ui/PageHeader'
import { REGLAS, TORNEO } from '@/lib/torneo'

// En la Fase 11 este contenido vendrá de la base de datos y será editable desde el panel.
export default function Torneo() {
  return (
    <>
      <PageHeader
        antetitulo={`Comunidad de ${TORNEO.comunidad}`}
        titulo="El torneo"
        descripcion="Formato de competencia, sistema de puntos y criterios de desempate."
        icono={Info}
      />
      <Container className="grid gap-4 py-8 sm:py-12 md:grid-cols-2">
        <Card className="md:col-span-2">
          <TituloTarjeta icono={Trophy}>Formato</TituloTarjeta>
          <ul className="mt-3 space-y-2">
            {REGLAS.formato.map((regla) => (
              <li key={regla} className="flex gap-2 text-noche-800">
                <span
                  className="mt-2 size-1.5 shrink-0 rounded-full bg-fucsia-500"
                  aria-hidden="true"
                />
                {regla}
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <TituloTarjeta icono={Medal}>Puntos</TituloTarjeta>
          <dl className="mt-3 grid grid-cols-3 gap-2 text-center">
            {REGLAS.puntos.map(({ resultado, puntos }) => (
              <div key={resultado} className="flex flex-col-reverse rounded-xl bg-morado-50 p-3">
                <dt className="text-xs font-semibold tracking-wide text-noche-700 uppercase">
                  {resultado}
                </dt>
                <dd className="font-display text-4xl font-extrabold text-morado-700">{puntos}</dd>
              </div>
            ))}
          </dl>
        </Card>

        <Card>
          <TituloTarjeta icono={ListOrdered}>Desempates</TituloTarjeta>
          <p className="mt-1 text-sm text-noche-700/80">Si dos o más equipos empatan en puntos:</p>
          <ol className="mt-3 space-y-2">
            {REGLAS.desempates.map((criterio, i) => (
              <li key={criterio} className="flex items-center gap-3">
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-fucsia-500 font-display font-bold text-white">
                  {i + 1}
                </span>
                {criterio}
              </li>
            ))}
          </ol>
        </Card>

        <Card className="border-cancha-400/40 bg-cancha-400/5 md:col-span-2">
          <ul className="space-y-1 text-sm text-noche-800">
            {REGLAS.notas.map((nota) => (
              <li key={nota}>• {nota}</li>
            ))}
          </ul>
        </Card>
      </Container>
    </>
  )
}

function TituloTarjeta({ icono: Icono, children }) {
  return (
    <h2 className="flex items-center gap-2 text-2xl">
      <Icono className="size-5 text-fucsia-500" aria-hidden="true" />
      {children}
    </h2>
  )
}
