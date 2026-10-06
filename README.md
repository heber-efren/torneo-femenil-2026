# Torneo Femenil 2026 · X-Hazil Sur

Sitio oficial del torneo comunitario de fútbol femenil de X-Hazil Sur.

**Tecnologías:** React + Vite · Tailwind CSS · React Router · Supabase · Vercel

---

## Estado actual: Fase 0 (esqueleto)

- Navegación completa: barra superior en computadora, barra inferior en celular y tablet.
- Las 14 páginas públicas existen. Inicio y "El torneo" ya tienen diseño; las demás muestran en qué fase se construyen.
- `/admin` solo comprueba la conexión con Supabase. El inicio de sesión llega en la Fase 2.

---

## 1. Ejecutar el proyecto en tu computadora

Requisitos: Node.js 24 LTS y Git.

1. Descomprime el .zip en una carpeta fácil de encontrar, por ejemplo `Documentos\torneo-femenil-2026`.
2. En VS Code, abre esa carpeta: **File → Open Folder…**
3. Abre el archivo **`.env.local`** y pega tu clave pública de Supabase después de `VITE_SUPABASE_ANON_KEY=`.
   - En Supabase: botón **Connect** (arriba) o **Project Settings → API Keys**.
   - Usa la clave **Publishable** (empieza con `sb_publishable_`) o la **anon** (en la pestaña *Legacy*).
   - **Nunca** uses la clave *secret* ni la *service_role*.
4. Abre la terminal de VS Code (**Terminal → New Terminal**) y ejecuta:

   ```powershell
   npm install
   npm run dev
   ```

5. Abre en el navegador la dirección que aparece (normalmente `http://localhost:5173`).
6. Entra a `http://localhost:5173/admin` y confirma que dice **"Conexión con Supabase correcta"**.

Para detener el servidor, presiona `Ctrl + C` en la terminal.

### Ver el sitio en tu celular (misma red Wi-Fi)

```powershell
npm run dev -- --host
```

Abre en el celular la dirección que dice `Network:` (por ejemplo `http://192.168.1.20:5173`).
Si Windows pregunta por el firewall, permite el acceso en redes privadas.

---

## 2. Subir el código a GitHub

1. En GitHub, haz clic en **+ → New repository**.
   - **Repository name:** `torneo-femenil-2026`
   - Puede ser **Private** o **Public**.
   - **No** marques "Add a README", ".gitignore" ni "license" (el repositorio debe quedar vacío).
2. En la terminal de VS Code, dentro de la carpeta del proyecto:

   ```powershell
   git init
   git add .
   git commit -m "Fase 0: esqueleto del sitio"
   git branch -M main
   git remote add origin https://github.com/heber-efren/torneo-femenil-2026.git
   git push -u origin main
   ```

3. La primera vez se abrirá una ventana para iniciar sesión en GitHub. Autoriza el acceso.
4. Recarga la página del repositorio en GitHub: deben aparecer los archivos.

> El archivo `.env.local` **no** se sube (está en `.gitignore`). Es correcto: las claves se configuran en Vercel.

---

## 3. Publicar en Vercel

1. En Vercel: **Add New… → Project**.
2. En *Import Git Repository*, elige **GitHub**, autoriza el acceso y selecciona `torneo-femenil-2026` → **Import**.
3. Vercel detecta **Vite** solo. No cambies *Build Command* ni *Output Directory*.
4. Abre **Environment Variables** y agrega las dos:

   | Key                      | Value                                       |
   | ------------------------ | ------------------------------------------- |
   | `VITE_SUPABASE_URL`      | `https://dryosesieapkujfbptmo.supabase.co`  |
   | `VITE_SUPABASE_ANON_KEY` | tu clave publishable / anon                 |

5. Haz clic en **Deploy** y espera 1–2 minutos.
6. Abre la dirección `.vercel.app` en tu computadora y en tu celular, y revisa `/admin`.

Desde ahora, cada vez que hagas `git push`, Vercel publicará los cambios automáticamente.

---

## Comandos disponibles

| Comando           | Para qué sirve                                     |
| ----------------- | -------------------------------------------------- |
| `npm run dev`     | Servidor de desarrollo con recarga automática      |
| `npm run build`   | Genera la versión final en la carpeta `dist`       |
| `npm run preview` | Prueba localmente la versión final                 |
| `npm run lint`    | Revisa el código en busca de errores comunes       |

---

## Estructura

```
src/
├─ app/router.jsx          rutas del sitio
├─ lib/                    supabase.js, navegacion.js (menús), torneo.js (datos y reglas)
├─ hooks/                  lógica reutilizable (menús desplegables)
├─ components/
│  ├─ ui/                  Button, Card, Badge, Container, PageHeader, EnConstruccion
│  └─ layout/              PublicLayout, Navbar, MobileNav, Footer, Logo
├─ pages/
│  ├─ public/              una página por sección
│  └─ admin/               panel de administración
└─ index.css               colores y tipografías del sitio (tokens de Tailwind)
```

- **Colores y tipografías:** `src/index.css` (bloque `@theme`).
- **Secciones del menú:** `src/lib/navegacion.js` (una sola lista para todos los menús).
- **Reglas del torneo:** `src/lib/torneo.js` y `docs/decisiones.md`.
