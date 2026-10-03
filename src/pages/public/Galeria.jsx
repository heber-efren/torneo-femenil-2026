import { Images } from 'lucide-react'
import { EnConstruccion } from '@/components/ui/EnConstruccion'

export default function Galeria() {
  return (
    <EnConstruccion
      titulo="Galería"
      descripcion="Las mejores imágenes de cada jornada."
      icono={Images}
      fase={10}
      contenido={['Fotos de los partidos', 'Vista ampliada', 'Fotos por jornada']}
    />
  )
}
