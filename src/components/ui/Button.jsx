import { Link } from 'react-router'

const VARIANTES = {
  primario:
    'bg-fucsia-500 text-white shadow-lg shadow-fucsia-500/25 hover:bg-fucsia-600 active:scale-[0.98]',
  secundario: 'bg-morado-600 text-white hover:bg-morado-700 active:scale-[0.98]',
  contorno: 'border-2 border-current bg-transparent hover:bg-white/10 active:scale-[0.98]',
  suave: 'bg-morado-100 text-morado-700 hover:bg-morado-200 active:scale-[0.98]',
}

const TAMANOS = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-5 text-base',
  lg: 'h-13 px-7 text-lg',
}

/**
 * Botón reutilizable. Si recibe "to" se comporta como enlace interno.
 * <Button to="/tabla">Ver tabla</Button>
 * <Button variante="suave" onClick={...}>Guardar</Button>
 */
export function Button({
  to,
  variante = 'primario',
  tamano = 'md',
  className = '',
  children,
  ...props
}) {
  const clases = `inline-flex items-center justify-center gap-2 rounded-full font-display font-bold tracking-wide uppercase transition disabled:pointer-events-none disabled:opacity-50 ${VARIANTES[variante]} ${TAMANOS[tamano]} ${className}`

  if (to) {
    return (
      <Link to={to} className={clases} {...props}>
        {children}
      </Link>
    )
  }

  return (
    <button type="button" className={clases} {...props}>
      {children}
    </button>
  )
}
