/** Tarjeta blanca base para agrupar contenido. */
export function Card({ as: Etiqueta = 'div', className = '', children, ...props }) {
  return (
    <Etiqueta
      className={`rounded-2xl border border-morado-100 bg-white p-5 shadow-sm shadow-morado-900/5 ${className}`}
      {...props}
    >
      {children}
    </Etiqueta>
  )
}
