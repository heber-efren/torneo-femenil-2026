import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'

export default function NoEncontrada() {
  return (
    <Container className="grid place-items-center py-20 text-center">
      <p className="font-display text-8xl font-extrabold text-fucsia-500 italic">404</p>
      <h1 className="mt-2 text-4xl">Balón fuera de la cancha</h1>
      <p className="mt-2 max-w-sm text-noche-700/80">
        La página que buscas no existe o cambió de lugar.
      </p>
      <Button to="/" className="mt-6">
        Volver al inicio
      </Button>
    </Container>
  )
}
