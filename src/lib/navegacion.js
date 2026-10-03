import {
  BarChart3,
  CalendarDays,
  ClipboardList,
  House,
  Images,
  Info,
  ListOrdered,
  Newspaper,
  Shield,
  Trophy,
  Users,
} from 'lucide-react'

// Lista única de secciones del sitio. La usan el menú de escritorio,
// la barra inferior del celular, el menú "Más", el pie de página y
// los accesos rápidos del inicio. Si agregas una sección, hazlo solo aquí.
//
//   escritorio: aparece directo en la barra superior (pantallas grandes)
//   movil:      aparece directo en la barra inferior (celular y tablet)
//   Las que no tienen la marca se muestran dentro de "Más".
export const SECCIONES = [
  { ruta: '/', nombre: 'Inicio', icono: House, escritorio: true, movil: true },
  {
    ruta: '/equipos',
    nombre: 'Equipos',
    icono: Shield,
    escritorio: true,
    movil: true,
    descripcion: 'Los 6 equipos y sus plantillas',
  },
  {
    ruta: '/jugadoras',
    nombre: 'Jugadoras',
    icono: Users,
    escritorio: true,
    descripcion: 'Perfiles y estadísticas individuales',
  },
  {
    ruta: '/calendario',
    nombre: 'Calendario',
    icono: CalendarDays,
    escritorio: true,
    movil: true,
    descripcion: 'Todos los partidos por jornada',
  },
  {
    ruta: '/resultados',
    nombre: 'Resultados',
    icono: ClipboardList,
    escritorio: true,
    descripcion: 'Marcadores de cada jornada',
  },
  {
    ruta: '/tabla',
    nombre: 'Tabla',
    icono: ListOrdered,
    escritorio: true,
    movil: true,
    descripcion: 'Tabla de posiciones',
  },
  {
    ruta: '/estadisticas',
    nombre: 'Estadísticas',
    icono: BarChart3,
    descripcion: 'Números del torneo',
  },
  {
    ruta: '/goleadoras',
    nombre: 'Goleadoras',
    icono: Trophy,
    descripcion: 'La lucha por el título de goleo',
  },
  {
    ruta: '/noticias',
    nombre: 'Noticias',
    icono: Newspaper,
    descripcion: 'Lo último del torneo',
  },
  { ruta: '/galeria', nombre: 'Galería', icono: Images, descripcion: 'Fotos de los partidos' },
  {
    ruta: '/torneo',
    nombre: 'El torneo',
    icono: Info,
    descripcion: 'Formato, reglas y desempates',
  },
]

export const SECCIONES_ESCRITORIO = SECCIONES.filter((s) => s.escritorio)
export const SECCIONES_MAS_ESCRITORIO = SECCIONES.filter((s) => !s.escritorio)
export const SECCIONES_MOVIL = SECCIONES.filter((s) => s.movil)
// Accesos rápidos: todas menos Inicio
export const ACCESOS_RAPIDOS = SECCIONES.filter((s) => s.ruta !== '/')
