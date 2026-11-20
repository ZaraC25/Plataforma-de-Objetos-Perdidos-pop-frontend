import { useState } from 'react';
import { useSolicitudesAprobadas } from '../features/recuperacion/api/useSolicitudesAprobadas';
import { useRegistrarEntrega } from '../features/recuperacion/api/useRegistrarEntrega';
import { PackageCheck } from 'lucide-react';
import { PageHeader, EmptyState, LoadingState, formatDate } from '../components/ui';

export function EntregasPage() {
  const { data: solicitudes, isLoading } = useSolicitudesAprobadas();
  const { mutateAsync: registrarEntrega, isPending } = useRegistrarEntrega();
  const [confirmando, setConfirmando] = useState<number | null>(null);

  const entregar = async (id: number) => {
    await registrarEntrega({ solicitudId: id });
    setConfirmando(null);
  };

  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader
        title="Entregas"
        description="Solicitudes aprobadas que esperan que el estudiante recoja el objeto. Registra la entrega cuando lo tenga en sus manos."
      />

      {isLoading ? (
        <LoadingState label="Cargando entregas…" />
      ) : !solicitudes?.length ? (
        <EmptyState icon={PackageCheck} title="No hay entregas pendientes" description="Cuando apruebes una solicitud, aparecerá aquí hasta que registres la entrega." />
      ) : (
        <ul className="panel divide-y divide-line">
          {solicitudes.map((sol) => (
            <li key={sol.id} className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <p className="font-semibold text-ink">{sol.objetoTitulo}</p>
                <p className="mt-1 text-[13px] text-ink-soft">Solicitud #{sol.id}, aprobada el {formatDate(sol.fechaCreacion)}</p>
              </div>
              {confirmando === sol.id ? (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-ink-soft">¿Ya lo entregaste?</span>
                  <button onClick={() => setConfirmando(null)} className="btn btn-ghost px-3 py-2">No</button>
                  <button onClick={() => entregar(sol.id)} disabled={isPending} className="btn btn-accent px-3 py-2">Sí, registrar</button>
                </div>
              ) : (
                <button onClick={() => setConfirmando(sol.id)} disabled={isPending} className="btn btn-primary">
                  <PackageCheck size={16} /> Registrar entrega
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
