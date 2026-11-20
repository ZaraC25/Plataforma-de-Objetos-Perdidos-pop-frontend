import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Sidebar';

export function AuthLayout({ title, aside, children }: { title: string; aside: string; children: ReactNode }) {
  return (
    <div className="flex min-h-[100dvh] bg-paper">
      <div className="relative hidden w-[44%] flex-col justify-between overflow-hidden bg-brand-dark p-12 text-white lg:flex">
        {/* Patrón de perforaciones de etiqueta */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: 'radial-gradient(circle, #fff 2px, transparent 2.5px)',
            backgroundSize: '28px 28px',
          }}
        />
        <Link to="/" className="relative flex items-center gap-2.5">
          <Logo size={34} />
          <span className="font-display text-2xl font-extrabold tracking-tight">POP</span>
        </Link>
        <p
          className="relative max-w-md font-display text-[44px] font-extrabold leading-[1.02]"
          style={{ letterSpacing: '-0.03em' }}
        >
          {aside}
        </p>
        <p className="relative text-sm text-white/60">Oficina de objetos perdidos de la universidad</p>
      </div>

      <div className="flex flex-1 items-center justify-center px-4 py-12 sm:px-8">
        <div className="w-full max-w-sm">
          <Link to="/" className="mb-10 flex items-center gap-2.5 lg:hidden">
            <Logo />
            <span className="font-display text-xl font-extrabold tracking-tight text-brand-dark">POP</span>
          </Link>
          <h1 className="text-3xl font-[650]">{title}</h1>
          {children}
        </div>
      </div>
    </div>
  );
}
