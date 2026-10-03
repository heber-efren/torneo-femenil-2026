import { BarChart3 } from 'lucide-react'
import { EnConstruccion } from '@/components/ui/EnConstruccion'

export default function Estadisticas() {
  return (
    <EnConstruccion
      titulo="Estadísticas"
      descripcion="Los números que cuentan la historia del torneo."
      icono={BarChart3}
      fase={7}
      contenido={[
        'Más asistencias',
        'Más partidos jugados',
        'Porterías en cero',
        'Equipo más goleador y menos goleado',
      ]}
    />
  )
}
