import { useEffect, useRef, useState } from 'react';
import { Bell, BellOff } from 'lucide-react';
import { useNotificaciones } from '../../features/notificaciones/api/useNotificaciones';
import { formatDate } from '../ui';

export function CampanaNotificaciones() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { data: notificaciones } = useNotificaciones();

  const noLeidas = notificaciones?.length || 0;

  // Cierra al hacer clic fuera o con Escape
  useEffect(() => {
    if (!isOpen) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setIsOpen(false);
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="btn btn-icon relative text-ink-soft hover:text-ink"
        aria-label={`Notificaciones${noLeidas ? `: ${noLeidas} nuevas` : ''}`}
        aria-expanded={isOpen}
      >
        <Bell size={20} strokeWidth={1.9} />
        {noLeidas > 0 && (
          <span className="absolute right-1 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-danger px-1 text-[10px] font-bold tabular-nums text-white ring-2 ring-paper">
            {noLeidas > 9 ? '9+' : noLeidas}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="pop-in absolute right-0 z-50 mt-2 w-[min(20rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-line bg-white shadow-[0_20px_40px_-20px_rgba(14,42,58,.35)]">
          <div className="border-b border-line px-4 py-3 text-sm font-semibold">Notificaciones</div>
          <div className="max-h-80 overflow-y-auto">
            {noLeidas === 0 ? (
              <div className="flex flex-col items-center gap-2 px-4 py-10 text-center text-sm text-ink-soft">
                <BellOff size={20} />
                Estás al día. Te avisaremos aquí cuando cambie el estado de un reporte o solicitud.
              </div>
            ) : (
              notificaciones?.map((noti) => (
                <div key={noti.id} className="row-hover border-b border-line px-4 py-3 last:border-0">
                  <p className="text-sm text-ink">{noti.mensaje}</p>
                  <p className="mt-1 text-xs text-ink-soft">{formatDate(noti.fechaCreacion)}</p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
