import { CalendarDays } from 'lucide-react'
import { EnConstruccion } from '@/components/ui/EnConstruccion'

export default function Calendario() {
  return (
    <EnConstruccion
      titulo="Calendario"
      descripcion="Los 15 partidos de la fase regular y la gran final."
      icono={CalendarDays}
      fase={5}
      contenido={[
        'Partidos organizados por jornada',
        'Fecha, hora y campo',
        'Estado de cada partido',
        'Marcador final cuando termine',
      ]}
    />
  )
}
