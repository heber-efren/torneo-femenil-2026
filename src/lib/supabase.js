import { createClient } from '@supabase/supabase-js'

// Las variables vienen de ".env.local" (en tu computadora) o de la
// configuración del proyecto en Vercel (en internet). Vite solo expone
// al navegador las variables que empiezan con "VITE_".
const url = import.meta.env.VITE_SUPABASE_URL
const clave = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabaseConfigurado = Boolean(url && clave)

if (!supabaseConfigurado) {
  console.warn(
    '[Supabase] Faltan VITE_SUPABASE_URL o VITE_SUPABASE_ANON_KEY. ' +
      'Revisa tu archivo .env.local o las variables de entorno en Vercel.',
  )
}

// Cliente único para todo el sitio. Es null si faltan las variables,
// así la página sigue funcionando y solo avisa del problema.
export const supabase = supabaseConfigurado ? createClient(url, clave) : null

/**
 * Comprueba que la URL y la clave pública sean válidas consultando el
 * servicio de autenticación de Supabase. No lee ni escribe datos.
 * @returns {Promise<{ ok: boolean, mensaje: string }>}
 */
export async function verificarConexion() {
  if (!supabaseConfigurado) {
    return { ok: false, mensaje: 'Faltan las variables de entorno de Supabase.' }
  }
  try {
    const respuesta = await fetch(`${url}/auth/v1/health`, { headers: { apikey: clave } })
    if (respuesta.ok) return { ok: true, mensaje: 'Conexión con Supabase correcta.' }
    if (respuesta.status === 401) {
      return { ok: false, mensaje: 'Supabase rechazó la clave. Revisa VITE_SUPABASE_ANON_KEY.' }
    }
    return { ok: false, mensaje: `Supabase respondió con el código ${respuesta.status}.` }
  } catch {
    return {
      ok: false,
      mensaje: 'No se pudo contactar a Supabase. Revisa VITE_SUPABASE_URL o tu conexión.',
    }
  }
}
