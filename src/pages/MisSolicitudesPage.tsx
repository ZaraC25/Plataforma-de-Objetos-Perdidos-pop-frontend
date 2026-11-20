import { Link } from 'react-router-dom';
import { useSolicitudes } from '../features/recuperacion/api/useSolicitudes';
import { ClipboardList } from 'lucide-react';
import { PageHeader, EmptyState, LoadingState, StatusBadge, folio, formatDate } from '../components/ui';

export function MisSolicitudesPage() {
  const { data: solicitudes, isLoading } = useSolicitudes();

  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader
        title="Mis solicitudes de recuperación"
        description="Cuando el encargado apruebe una solicitud, podrás recoger el objeto en la oficina."
      />

      {isLoading ? (
        <LoadingState label="Cargando solicitudes…" />
      ) : !solicitudes?.length ? (
        <EmptyState
          icon={ClipboardList}
          title="No has reclamado ningún objeto"
          description="Si encuentras algo tuyo en el catálogo, ábrelo y solicita la recuperación."
          action={<Link to="/app" className="btn btn-primary">Ir al catálogo</Link>}
        />
      ) : (
        <ul className="panel divide-y divide-line">
          {solicitudes.map((sol) => (
            <li key={sol.id} className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <Link to={`/app/objetos/${sol.objetoId}`} className="font-semibold text-ink hover:text-brand-dark">
                  {sol.objetoTitulo || `Objeto ${folio(sol.objetoId)}`}
                </Link>
                <p className="mt-1 text-[13px] text-ink-soft">
                  Solicitud #{sol.id}, enviada el {formatDate(sol.fechaCreacion)}
                </p>
              </div>
              <StatusBadge estado={sol.estado} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
