import { Newspaper } from 'lucide-react'
import { EnConstruccion } from '@/components/ui/EnConstruccion'

export default function Noticias() {
  return (
    <EnConstruccion
      titulo="Noticias"
      descripcion="Lo último del Torneo Femenil 2026."
      icono={Newspaper}
      fase={9}
      contenido={['Crónicas de los partidos', 'Avisos de la organización', 'Fotos de portada']}
    />
  )
}
