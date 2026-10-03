import { createBrowserRouter } from 'react-router'
import { PublicLayout } from '@/components/layout/PublicLayout'
import AdminInicio from '@/pages/admin/AdminInicio'
import ErrorPagina from '@/pages/ErrorPagina'
import Calendario from '@/pages/public/Calendario'
import EquipoDetalle from '@/pages/public/EquipoDetalle'
import Equipos from '@/pages/public/Equipos'
import Estadisticas from '@/pages/public/Estadisticas'
import Galeria from '@/pages/public/Galeria'
import Goleadoras from '@/pages/public/Goleadoras'
import Inicio from '@/pages/public/Inicio'
import JugadoraDetalle from '@/pages/public/JugadoraDetalle'
import Jugadoras from '@/pages/public/Jugadoras'
import NoEncontrada from '@/pages/public/NoEncontrada'
import NoticiaDetalle from '@/pages/public/NoticiaDetalle'
import Noticias from '@/pages/public/Noticias'
import Resultados from '@/pages/public/Resultados'
import Tabla from '@/pages/public/Tabla'
import Torneo from '@/pages/public/Torneo'

export const router = createBrowserRouter([
  {
    // Sitio público: comparte barra superior, barra inferior móvil y pie de página
    element: <PublicLayout />,
    errorElement: <ErrorPagina />,
    children: [
      { index: true, element: <Inicio /> },
      { path: 'equipos', element: <Equipos /> },
      { path: 'equipos/:slug', element: <EquipoDetalle /> },
      { path: 'jugadoras', element: <Jugadoras /> },
      { path: 'jugadoras/:id', element: <JugadoraDetalle /> },
      { path: 'calendario', element: <Calendario /> },
      { path: 'resultados', element: <Resultados /> },
      { path: 'tabla', element: <Tabla /> },
      { path: 'estadisticas', element: <Estadisticas /> },
      { path: 'goleadoras', element: <Goleadoras /> },
      { path: 'noticias', element: <Noticias /> },
      { path: 'noticias/:slug', element: <NoticiaDetalle /> },
      { path: 'galeria', element: <Galeria /> },
      { path: 'torneo', element: <Torneo /> },
      { path: '*', element: <NoEncontrada /> },
    ],
  },
  {
    // Panel de administración (se protegerá con inicio de sesión en la Fase 2)
    path: 'admin',
    errorElement: <ErrorPagina />,
    children: [{ index: true, element: <AdminInicio /> }],
  },
])
