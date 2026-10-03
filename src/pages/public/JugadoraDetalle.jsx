import { Users } from 'lucide-react'
import { useParams } from 'react-router'
import { EnConstruccion } from '@/components/ui/EnConstruccion'

export default function JugadoraDetalle() {
  const { id } = useParams()

  return (
    <EnConstruccion
      titulo="Jugadora"
      descripcion={`Perfil de la jugadora: ${id}`}
      icono={Users}
      fase={4}
      contenido={['Foto y datos', 'Goles, asistencias y partidos', 'Historial por partido']}
    />
  )
}
