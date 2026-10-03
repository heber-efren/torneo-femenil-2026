import { ClipboardList } from 'lucide-react'
import { EnConstruccion } from '@/components/ui/EnConstruccion'

export default function Resultados() {
  return (
    <EnConstruccion
      titulo="Resultados"
      descripcion="Marcadores de cada jornada."
      icono={ClipboardList}
      fase={6}
      contenido={[
        'Resultado de cada partido',
        'Goleadoras de cada encuentro',
        'Filtro por jornada',
        'Penales en la final',
      ]}
    />
  )
}
