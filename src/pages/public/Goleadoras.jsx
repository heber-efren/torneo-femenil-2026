import { Trophy } from 'lucide-react'
import { EnConstruccion } from '@/components/ui/EnConstruccion'

export default function Goleadoras() {
  return (
    <EnConstruccion
      titulo="Goleadoras"
      descripcion="La lucha por el título de goleo."
      icono={Trophy}
      fase={7}
      contenido={[
        'Máxima goleadora',
        'Ranking completo de goles',
        'Goles por equipo',
        'Incluye los goles de la final',
      ]}
    />
  )
}
