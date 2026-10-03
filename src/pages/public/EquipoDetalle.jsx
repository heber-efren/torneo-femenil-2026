import { Shield } from 'lucide-react'
import { useParams } from 'react-router'
import { EnConstruccion } from '@/components/ui/EnConstruccion'

export default function EquipoDetalle() {
  const { slug } = useParams()

  return (
    <EnConstruccion
      titulo="Equipo"
      descripcion={`Perfil del equipo: ${slug}`}
      icono={Shield}
      fase={3}
      contenido={[
        'Plantilla completa',
        'Estadísticas del equipo',
        'Próximos partidos y resultados',
      ]}
    />
  )
}
