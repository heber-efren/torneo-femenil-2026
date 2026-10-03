import { isRouteErrorResponse, useRouteError } from 'react-router'

/** Se muestra si una página falla al cargar, en lugar de una pantalla en blanco. */
export default function ErrorPagina() {
  const error = useRouteError()
  console.error(error)

  const detalle = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : error instanceof Error
      ? error.message
      : 'Error desconocido'

  return (
    <div className="grid min-h-dvh place-items-center bg-noche-950 p-6 text-center text-white">
      <div>
        <h1 className="text-5xl">Algo salió mal</h1>
        <p className="mt-3 text-morado-200">
          Recarga la página. Si el problema sigue, avisa a la organización.
        </p>
        <p className="mt-4 rounded-lg bg-white/5 px-3 py-2 font-mono text-xs text-fucsia-300">
          {detalle}
        </p>
        <a
          href="/"
          className="mt-6 inline-flex h-11 items-center rounded-full bg-fucsia-500 px-6 font-display font-bold tracking-wide uppercase"
        >
          Ir al inicio
        </a>
      </div>
    </div>
  )
}
