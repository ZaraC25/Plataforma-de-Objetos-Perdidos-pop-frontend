import { MapPin, CalendarDays } from 'lucide-react';
import { StatusBadge, categoriaLabel, formatDate } from './index';

export interface ReporteItem {
  id: number;
  descripcion: string;
  categoria: string;
  ultimaUbicacion: string;
  fechaPerdida: string;
  estado: string;
}

export function ReporteRow({ rep }: { rep: ReporteItem }) {
  return (
    <li className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <p className="text-xs font-semibold text-ink-soft">{categoriaLabel(rep.categoria)}</p>
        <p className="mt-0.5 font-semibold text-ink">{rep.descripcion}</p>
        <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-ink-soft">
          <span className="flex items-center gap-1.5"><MapPin size={14} /> {rep.ultimaUbicacion || 'Sin lugar indicado'}</span>
          <span className="flex items-center gap-1.5"><CalendarDays size={14} /> {formatDate(rep.fechaPerdida)}</span>
        </div>
      </div>
      <StatusBadge estado={rep.estado} />
    </li>
  );
}
