import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Estado de un menú que se abre y se cierra.
 * Se cierra solo al presionar Escape o al hacer clic fuera de "ref".
 */
export function useMenuDesplegable() {
  const [abierto, setAbierto] = useState(false)
  const ref = useRef(null)

  const cerrar = useCallback(() => setAbierto(false), [])
  const alternar = useCallback(() => setAbierto((valor) => !valor), [])

  useEffect(() => {
    if (!abierto) return

    function alPresionarTecla(evento) {
      if (evento.key === 'Escape') setAbierto(false)
    }
    function alHacerClic(evento) {
      if (ref.current && !ref.current.contains(evento.target)) setAbierto(false)
    }

    document.addEventListener('keydown', alPresionarTecla)
    document.addEventListener('pointerdown', alHacerClic)
    return () => {
      document.removeEventListener('keydown', alPresionarTecla)
      document.removeEventListener('pointerdown', alHacerClic)
    }
  }, [abierto])

  return { abierto, alternar, cerrar, ref }
}
