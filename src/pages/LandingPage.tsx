import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { Logo } from '../components/layout/Sidebar';
import { useAuthStore } from '../stores/authStore';

// Ejemplos ilustrativos para la portada (no son datos reales)
const etiquetas = [
  { folio: 'N.º 0218', titulo: 'Audífonos inalámbricos blancos', lugar: 'Biblioteca, piso 2', rot: '-6deg', x: '0%', y: '0%', tone: 'bg-white' },
  { folio: 'N.º 0219', titulo: 'Carné estudiantil', lugar: 'Cafetería central', rot: '4deg', x: '22%', y: '35%', tone: 'bg-[#EAF5DB]' },
  { folio: 'N.º 0220', titulo: 'Llaves con llavero azul', lugar: 'Bloque B, salón 204', rot: '-2deg', x: '6%', y: '68%', tone: 'bg-[#E3F1F8]' },
];

const pasos = [
  {
    titulo: 'Busca en el catálogo',
    texto: 'Todo lo que llega a la oficina de objetos perdidos se registra con su lugar y fecha de hallazgo.',
  },
  {
    titulo: 'Demuestra que es tuyo',
    texto: 'Describe detalles que solo el dueño conoce y adjunta una foto o factura. Solo el encargado los ve.',
  },
  {
    titulo: 'Recógelo en la oficina',
    texto: 'Cuando aprueben tu solicitud te avisamos. La entrega queda registrada para que el proceso sea transparente.',
  },
];

export function LandingPage() {
  const token = useAuthStore((s) => s.token);

  return (
    <div className="min-h-[100dvh] overflow-x-hidden bg-paper">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-8">
        <Link to="/" className="flex items-center gap-2.5">
          <Logo />
          <span className="font-display text-xl font-extrabold tracking-tight text-brand-dark">POP</span>
        </Link>
        {token ? (
          <Link to="/app" className="btn btn-primary">Ir al catálogo</Link>
        ) : (
          <Link to="/login" className="btn btn-ghost">Iniciar sesión</Link>
        )}
      </nav>

      {/* Portada */}
      <section className="mx-auto grid max-w-6xl items-center gap-14 px-4 pb-20 pt-10 sm:px-8 lg:grid-cols-[1.1fr_1fr] lg:pt-16">
        <div>
          <h1
            className="rise font-display text-[44px] font-extrabold leading-[0.98] text-brand-dark sm:text-[64px] lg:text-[76px]"
            style={{ letterSpacing: '-0.035em' }}
          >
            ¿Perdiste algo en el campus?
          </h1>
          <p className="rise mt-6 max-w-lg text-lg leading-relaxed text-ink-soft" style={{ animationDelay: '80ms' }}>
            Revisa lo que ya llegó a la oficina de objetos perdidos, reporta lo que te falta y reclámalo sin hacer filas.
          </p>
          <div className="rise mt-9 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: '140ms' }}>
            <Link to="/app" className="btn btn-primary btn-lg">Ver objetos encontrados</Link>
            {!token && (
              <Link to="/login" className="btn btn-ghost btn-lg">Iniciar sesión</Link>
            )}
          </div>
        </div>

        {/* Pila de etiquetas */}
        <div className="relative mx-auto h-[340px] w-full max-w-[440px] sm:h-[400px]" aria-hidden>
          {etiquetas.map((e, i) => (
            <div
              key={e.folio}
              className="rise absolute w-[78%]"
              style={{ left: e.x, top: e.y, animationDelay: `${200 + i * 70}ms` }}
            >
              <div style={{ transform: `rotate(${e.rot})` }}>
                <div className={`tag-card ${e.tone} py-5 pl-12 pr-5 shadow-[0_18px_40px_-22px_rgba(14,42,58,.45)]`}>
                  <p className="text-xs font-semibold tabular-nums text-ink-soft">{e.folio}</p>
                  <p className="mt-1 font-display text-lg font-[650] leading-snug text-ink">{e.titulo}</p>
                  <p className="mt-2 flex items-center gap-1.5 text-sm text-ink-soft">
                    <MapPin size={14} /> {e.lugar}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Cómo funciona: es un proceso secuencial, por eso va numerado */}
      <section className="border-t border-line bg-white">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-8">
          <h2 className="max-w-md text-3xl font-[650] sm:text-4xl">Cómo recuperar lo que perdiste</h2>
          <ol className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
            {pasos.map((p, i) => (
              <li key={p.titulo} className="border-t-2 border-brand-dark pt-5">
                <span className="font-display text-4xl font-extrabold text-brand-green">{i + 1}</span>
                <h3 className="mt-3 text-xl font-[650]">{p.titulo}</h3>
                <p className="mt-2 leading-relaxed text-ink-soft">{p.texto}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <footer className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-ink-soft sm:flex-row sm:justify-between sm:px-8">
        <span>Plataforma de Objetos Perdidos de la universidad</span>
        <span>Las cuentas las crea la administración.</span>
      </footer>
    </div>
  );
}
