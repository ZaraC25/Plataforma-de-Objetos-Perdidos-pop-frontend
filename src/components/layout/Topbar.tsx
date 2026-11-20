import { Menu } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import { CampanaNotificaciones } from './CampanaNotificaciones';
import { humanize } from '../ui';

function iniciales(nombre?: string) {
  if (!nombre) return '?';
  return nombre
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join('');
}

export function Topbar({ onMenu }: { onMenu: () => void }) {
  const usuario = useAuthStore((state) => state.usuario);

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-line bg-paper/85 px-4 backdrop-blur-md sm:px-8 lg:px-10">
      <button onClick={onMenu} className="btn btn-icon btn-ghost lg:hidden" aria-label="Abrir menú">
        <Menu size={18} />
      </button>
      <span className="hidden text-sm font-medium text-ink-soft lg:block">Plataforma de objetos perdidos</span>

      <div className="flex items-center gap-3 sm:gap-5">
        <CampanaNotificaciones />
        <div className="flex items-center gap-3 border-l border-line pl-3 sm:pl-5">
          <div className="grid h-9 w-9 place-items-center rounded-full bg-brand-dark text-xs font-bold text-white">
            {iniciales(usuario?.nombre)}
          </div>
          <div className="hidden text-sm leading-tight sm:block">
            <p className="font-semibold text-ink">{usuario?.nombre}</p>
            <p className="text-xs text-ink-soft">{humanize(usuario?.rol)}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
