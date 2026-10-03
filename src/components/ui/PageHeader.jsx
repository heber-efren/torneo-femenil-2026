import { Container } from './Container'

/** Encabezado oscuro de cada página interna. */
export function PageHeader({ antetitulo, titulo, descripcion, icono: Icono }) {
  return (
    <header className="relative overflow-hidden bg-noche-950 text-white">
      {/* Franjas diagonales decorativas */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-0 w-2/3 bg-[repeating-linear-gradient(115deg,transparent_0_28px,rgb(255_255_255/0.04)_28px_56px)]"
      />
      <div
        aria-hidden="true"
        className="absolute -right-24 -bottom-32 size-72 rounded-full bg-fucsia-500/25 blur-3xl"
      />
      <Container className="relative py-10 sm:py-14">
        {antetitulo && (
          <p className="mb-2 flex items-center gap-2 text-sm font-semibold tracking-widest text-fucsia-300 uppercase">
            {Icono && <Icono className="size-4" aria-hidden="true" />}
            {antetitulo}
          </p>
        )}
        <h1 className="text-5xl leading-none sm:text-6xl">{titulo}</h1>
        {descripcion && <p className="mt-3 max-w-xl text-morado-200">{descripcion}</p>}
      </Container>
      <div
        aria-hidden="true"
        className="h-1.5 bg-linear-to-r from-morado-500 via-fucsia-500 to-cancha-400"
      />
    </header>
  )
}
