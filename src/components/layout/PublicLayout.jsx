import { Outlet, ScrollRestoration } from 'react-router'
import { Footer } from './Footer'
import { MobileNav } from './MobileNav'
import { Navbar } from './Navbar'

/** Estructura común de todas las páginas públicas. */
export function PublicLayout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <MobileNav />
      <ScrollRestoration />
    </div>
  )
}
