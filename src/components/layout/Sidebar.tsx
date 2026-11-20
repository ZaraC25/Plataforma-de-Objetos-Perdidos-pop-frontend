import { Link, NavLink, useNavigate } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import {
  Package, Users, LogOut, Plus, FileWarning, ClipboardList,
  PackageCheck, BarChart2, ShieldCheck, Inbox, X,
} from 'lucide-react';

type Item = { to: string; label: string; icon: LucideIcon };

const general: Item[] = [
  { to: '/app', label: 'Catálogo', icon: Package },
  { to: '/app/mis-reportes', label: 'Mis reportes', icon: FileWarning },
  { to: '/app/mis-solicitudes', label: 'Mis solicitudes', icon: ClipboardList },
];

const gestion: Item[] = [
  { to: '/app/encargado/objetos/nuevo', label: 'Registrar objeto', icon: Plus },
  { to: '/app/encargado/reportes', label: 'Reportes de pérdida', icon: Inbox },
  { to: '/app/encargado/solicitudes', label: 'Solicitudes', icon: ClipboardList },
  { to: '/app/encargado/entregas', label: 'Entregas', icon: PackageCheck },
];

const admin: Item[] = [
  { to: '/app/admin/usuarios', label: 'Usuarios', icon: Users },
  { to: '/app/admin/estadisticas', label: 'Estadísticas', icon: BarChart2 },
  { to: '/app/admin/auditoria', label: 'Auditoría', icon: ShieldCheck },
];

function Section({ title, items }: { title?: string; items: Item[] }) {
  return (
    <div className="space-y-0.5">
      {title && <p className="px-3 pb-2 pt-6 text-xs font-semibold text-white/45">{title}</p>}
      {items.map(({ to, label, icon: Icon }) => (
        <NavLink key={to} to={to} end className="nav-link">
          <Icon size={18} strokeWidth={1.9} /> {label}
        </NavLink>
      ))}
    </div>
  );
}

export function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const usuario = useAuthStore((state) => state.usuario);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const esGestor = usuario?.rol === 'ADMINISTRADOR' || usuario?.rol === 'ENCARGADO_OBJETOS_PERDIDOS';

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      {/* Fondo del menú móvil */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-30 bg-ink/40 transition-opacity duration-200 lg:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        aria-hidden
      />
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-brand-dark text-sm lg:sticky lg:top-0 lg:h-[100dvh] lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ transition: 'transform 300ms cubic-bezier(0.32, 0.72, 0, 1)' }}
      >
        <div className="flex items-center justify-between px-5 py-5">
          <Link to="/" className="flex items-center gap-2.5 text-white">
            <Logo />
            <span className="font-display text-xl font-extrabold tracking-tight">POP</span>
          </Link>
          <button onClick={onClose} className="btn btn-icon text-white/70 lg:hidden" aria-label="Cerrar menú">
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 pb-4">
          <Section items={general} />
          {esGestor && <Section title="Gestión" items={gestion} />}
          {usuario?.rol === 'ADMINISTRADOR' && <Section title="Administración" items={admin} />}
        </nav>

        <div className="border-t border-white/10 p-3">
          <button onClick={handleLogout} className="nav-link w-full">
            <LogOut size={18} strokeWidth={1.9} /> Cerrar sesión
          </button>
        </div>
      </aside>
    </>
  );
}

/** Marca: una etiqueta de objeto perdido con los colores institucionales */
export function Logo({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden>
      <path d="M6 9.5 13.5 2H28a2 2 0 0 1 2 2v14.5L22.5 26H8a2 2 0 0 1-2-2Z" fill="#3B9AC4" transform="rotate(-8 16 16)" />
      <path d="M4 12.5 11.5 5H26a2 2 0 0 1 2 2v19a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z" fill="#fff" />
      <circle cx="11" cy="12" r="2.2" fill="#005B82" />
      <path d="M10 20.5l3.2 3.2 6.8-7.2" stroke="#8CC63F" strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
