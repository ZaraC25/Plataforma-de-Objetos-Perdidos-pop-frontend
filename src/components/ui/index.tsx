import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';

/** Convierte ENUM_DEL_BACKEND en "Enum del backend" */
export function humanize(value?: string | null) {
  if (!value) return '';
  const s = value.replace(/_/g, ' ').toLowerCase();
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function formatDate(value?: string, withTime = false) {
  if (!value) return '—';
  const d = new Date(value);
  return d.toLocaleDateString('es-CO', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    ...(withTime ? { hour: '2-digit', minute: '2-digit' } : {}),
  });
}

/** Fecha y hora local actual en formato YYYY-MM-DDTHH:mm para inputs datetime-local */
export function nowLocal() {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 16);
}

/** Número de folio del objeto, como en una etiqueta física de objetos perdidos */
export function folio(id: number) {
  return `N.º ${String(id).padStart(4, '0')}`;
}

export function PageHeader({
  title,
  description,
  action,
  backTo,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
  backTo?: { to: string; label: string };
}) {
  return (
    <header className="mb-8">
      {backTo && (
        <Link
          to={backTo.to}
          className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft transition-colors hover:text-brand-dark"
        >
          <ArrowLeft size={16} /> {backTo.label}
        </Link>
      )}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-[28px] font-[650] leading-tight sm:text-[32px]">{title}</h1>
          {description && <p className="mt-1.5 max-w-xl text-[15px] text-ink-soft">{description}</p>}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
    </header>
  );
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="panel flex flex-col items-center px-6 py-16 text-center">
      <div className="mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-paper text-brand-dark">
        <Icon size={26} strokeWidth={1.75} />
      </div>
      <h2 className="text-lg font-[650]">{title}</h2>
      {description && <p className="mt-1.5 max-w-sm text-sm text-ink-soft">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

export function LoadingState({ label = 'Cargando…' }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-2.5 py-24 text-sm text-ink-soft" role="status">
      <Loader2 size={18} className="animate-spin text-brand-light" style={{ animationDuration: '600ms' }} />
      {label}
    </div>
  );
}

export function ErrorState({ label }: { label: string }) {
  return (
    <div className="rounded-2xl border border-danger/20 bg-danger/5 px-6 py-10 text-center text-sm font-medium text-danger">
      {label}
    </div>
  );
}

type Tone = 'neutral' | 'blue' | 'green' | 'amber' | 'red';

const toneClasses: Record<Tone, string> = {
  neutral: 'bg-paper text-ink-soft ring-line',
  blue: 'bg-brand-light/10 text-brand-dark ring-brand-light/25',
  green: 'bg-brand-green/15 text-[#3d6614] ring-brand-green/35',
  amber: 'bg-amber-50 text-warn ring-amber-200',
  red: 'bg-red-50 text-danger ring-red-200',
};

const estadoTone: Record<string, Tone> = {
  DISPONIBLE_PARA_RECLAMACION: 'green',
  APROBADA: 'green',
  ACTIVA: 'green',
  EXITO: 'green',
  ENTREGADO: 'blue',
  ENTREGADA: 'blue',
  RECUPERADO: 'blue',
  PENDIENTE: 'amber',
  EN_REVISION: 'amber',
  EN_PROCESO_DE_RECLAMACION: 'amber',
  ABIERTO: 'amber',
  RECHAZADA: 'red',
  SUSPENDIDA: 'red',
  FALLO: 'red',
  ERROR: 'red',
};

export function Badge({ children, tone = 'neutral' }: { children: ReactNode; tone?: Tone }) {
  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${toneClasses[tone]}`}
    >
      {children}
    </span>
  );
}

export function StatusBadge({ estado }: { estado?: string }) {
  if (!estado) return null;
  return <Badge tone={estadoTone[estado] ?? 'neutral'}>{humanize(estado)}</Badge>;
}

export function Field({
  label,
  hint,
  children,
  htmlFor,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
  htmlFor?: string;
}) {
  return (
    <div>
      <label className="label" htmlFor={htmlFor}>
        {label}
      </label>
      {children}
      {hint && <p className="hint">{hint}</p>}
    </div>
  );
}

export const CATEGORIAS: { value: string; label: string }[] = [
  { value: 'ELECTRONICA', label: 'Electrónica' },
  { value: 'DOCUMENTOS', label: 'Documentos' },
  { value: 'ROPA', label: 'Ropa' },
  { value: 'ACCESORIOS', label: 'Accesorios' },
  { value: 'LLAVES', label: 'Llaves' },
  { value: 'CARTERAS_BOLSOS', label: 'Carteras / bolsos' },
  { value: 'LIBROS_APUNTES', label: 'Libros / apuntes' },
  { value: 'DEPORTES', label: 'Deportes' },
  { value: 'OTROS', label: 'Otros' },
];

export function categoriaLabel(value?: string) {
  return CATEGORIAS.find((c) => c.value === value)?.label ?? humanize(value);
}
