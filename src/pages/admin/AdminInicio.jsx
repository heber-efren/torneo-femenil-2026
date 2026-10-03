import { ArrowLeft, CircleAlert, CircleCheck, LoaderCircle, LockKeyhole } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { Emblema } from '@/components/layout/Logo'
import { verificarConexion } from '@/lib/supabase'

/**
 * Fase 0: página provisional del panel. Solo comprueba la conexión con Supabase.
 * En la Fase 2 se protegerá con inicio de sesión y solo entrará el administrador.
 */
export default function AdminInicio() {
  const [estado, setEstado] = useState({ cargando: true })

  useEffect(() => {
    let activo = true
    verificarConexion().then((resultado) => {
      if (activo) setEstado(resultado)
    })
    return () => {
      activo = false
    }
  }, [])

  return (
    <div className="grid min-h-dvh place-items-center bg-noche-950 p-4 text-white">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-noche-900 p-6 sm:p-8">
        <div className="flex items-center gap-3">
          <Emblema className="size-12" />
          <div>
            <h1 className="text-3xl leading-none">Administración</h1>
            <p className="text-sm text-morado-200">Torneo Femenil 2026</p>
          </div>
        </div>

        <div className="mt-6 flex gap-3 rounded-2xl bg-white/5 p-4 text-sm text-morado-100">
          <LockKeyhole className="size-5 shrink-0 text-fucsia-400" aria-hidden="true" />
          <p>
            El inicio de sesión y el panel se construyen en la <strong>Fase 2</strong>. Solo tu
            cuenta de administrador podrá entrar.
          </p>
        </div>

        <h2 className="mt-6 text-lg tracking-wide">Conexión con la base de datos</h2>
        <EstadoConexion estado={estado} />

        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 text-sm text-morado-200 transition hover:text-white"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Volver al sitio
        </Link>
      </div>
    </div>
  )
}

function EstadoConexion({ estado }) {
  if (estado.cargando) {
    return (
      <p className="mt-2 flex items-center gap-2 text-sm text-morado-200">
        <LoaderCircle className="size-5 animate-spin" aria-hidden="true" />
        Comprobando…
      </p>
    )
  }

  const Icono = estado.ok ? CircleCheck : CircleAlert
  return (
    <p
      role="status"
      className={`mt-2 flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium ${
        estado.ok ? 'bg-cancha-400/15 text-cancha-300' : 'bg-fucsia-500/15 text-fucsia-300'
      }`}
    >
      <Icono className="size-5 shrink-0" aria-hidden="true" />
      {estado.mensaje}
    </p>
  )
}
