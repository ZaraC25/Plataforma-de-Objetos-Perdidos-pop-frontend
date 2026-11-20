import { useParams, Link } from 'react-router-dom';
import { useObjeto } from '../features/objetos/api/useObjeto';
import { ArrowLeft, MapPin, CalendarDays, ShieldCheck } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { LoadingState, ErrorState, StatusBadge, categoriaLabel, folio, formatDate } from '../components/ui';

export function ObjetoDetallePage() {
  const { id } = useParams<{ id: string }>();
  const usuario = useAuthStore((state) => state.usuario);
  const { data: objeto, isLoading, isError } = useObjeto(Number(id));

  const back = (
    <Link to="/app" className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft transition-colors hover:text-brand-dark">
      <ArrowLeft size={16} /> Volver al catálogo
    </Link>
  );

  if (isLoading) return <LoadingState label="Cargando objeto…" />;
  if (isError || !objeto)
    return (
      <div className="mx-auto max-w-4xl">
        {back}
        <ErrorState label="Este objeto no existe o ya no está disponible." />
      </div>
    );

  const puedeReclamar = usuario?.rol === 'ESTUDIANTE' && objeto.estado === 'DISPONIBLE_PARA_RECLAMACION';

  return (
    <div className="mx-auto max-w-4xl">
      {back}

      <article className="tag-card overflow-hidden pl-0 hover:!translate-y-0 hover:!shadow-none">
        <div className="border-b border-dashed border-line py-7 pl-12 pr-7 sm:pl-14">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-semibold tabular-nums text-ink-soft">
              {folio(objeto.id)} · {categoriaLabel(objeto.categoria)}
            </span>
            <StatusBadge estado={objeto.estado} />
          </div>
          <h1 className="mt-3 text-3xl font-[650] leading-tight sm:text-4xl">{objeto.titulo}</h1>
        </div>

        <div className="grid gap-8 py-7 pl-12 pr-7 sm:pl-14 md:grid-cols-[1fr_260px]">
          <div>
            <h2 className="text-sm font-semibold text-ink-soft">Descripción</h2>
            <p className="mt-2 max-w-prose leading-relaxed text-ink">{objeto.descripcion}</p>
          </div>

          <div className="space-y-5">
            <dl className="space-y-4 text-sm">
              <div className="flex gap-3">
                <MapPin size={18} className="mt-0.5 shrink-0 text-brand-light" />
                <div>
                  <dt className="text-ink-soft">Dónde se encontró</dt>
                  <dd className="font-semibold text-ink">{objeto.ubicacion}</dd>
                </div>
              </div>
              <div className="flex gap-3">
                <CalendarDays size={18} className="mt-0.5 shrink-0 text-brand-light" />
                <div>
                  <dt className="text-ink-soft">Fecha de hallazgo</dt>
                  <dd className="font-semibold text-ink">{formatDate(objeto.fechaHallazgo, true)}</dd>
                </div>
              </div>
            </dl>

            {puedeReclamar && (
              <div>
                <Link to={`/app/solicitudes/nueva/${objeto.id}`} className="btn btn-accent btn-lg w-full">
                  <ShieldCheck size={18} /> Es mío, quiero reclamarlo
                </Link>
                <p className="hint">Te pediremos detalles que solo el dueño conoce.</p>
              </div>
            )}
          </div>
        </div>
      </article>
    </div>
  );
}
