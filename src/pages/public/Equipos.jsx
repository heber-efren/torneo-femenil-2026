import { Shield } from 'lucide-react'
import { EnConstruccion } from '@/components/ui/EnConstruccion'

export default function Equipos() {
  return (
    <EnConstruccion
      titulo="Equipos"
      descripcion="Conoce a los 6 equipos que disputan el torneo."
      icono={Shield}
      fase={3}
      contenido={[
        'Escudo y colores de cada equipo',
        'Entrenador o entrenadora',
        'Número de jugadoras',
        'Puntos, victorias, empates y derrotas',
      ]}
    />
  )
}
