import { Newspaper } from 'lucide-react'
import { useParams } from 'react-router'
import { EnConstruccion } from '@/components/ui/EnConstruccion'

export default function NoticiaDetalle() {
  const { slug } = useParams()

  return (
    <EnConstruccion
      titulo="Noticia"
      descripcion={`Nota completa: ${slug}`}
      icono={Newspaper}
      fase={9}
      contenido={['Título y foto de portada', 'Contenido de la noticia', 'Fecha de publicación']}
    />
  )
}
