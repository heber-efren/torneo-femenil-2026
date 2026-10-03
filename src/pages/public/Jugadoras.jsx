import { Users } from 'lucide-react'
import { EnConstruccion } from '@/components/ui/EnConstruccion'

export default function Jugadoras() {
  return (
    <EnConstruccion
      titulo="Jugadoras"
      descripcion="Todas las jugadoras del torneo y sus números."
      icono={Users}
      fase={4}
      contenido={[
        'Foto, número y posición',
        'Equipo al que pertenece',
        'Goles y asistencias',
        'Partidos jugados',
      ]}
    />
  )
}
