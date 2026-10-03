import { ListOrdered } from 'lucide-react'
import { EnConstruccion } from '@/components/ui/EnConstruccion'

export default function Tabla() {
  return (
    <EnConstruccion
      titulo="Tabla de posiciones"
      descripcion="Clasificación de la fase regular."
      icono={ListOrdered}
      fase={6}
      contenido={[
        'PJ, PG, PE, PP',
        'GF, GC y diferencia de goles',
        'Puntos y posición',
        'Zona de clasificación a la final',
      ]}
    />
  )
}
