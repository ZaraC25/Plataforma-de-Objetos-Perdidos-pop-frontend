import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSolicitudesPendientes } from '../features/recuperacion/api/useSolicitudesPendientes';
import { useResolverSolicitud } from '../features/recuperacion/api/useResolverSolicitud';
import { Check, X, ClipboardList } from 'lucide-react';
import { PageHeader, EmptyState, LoadingState, formatDate } from '../components/ui';

type Accion = { id: number; tipo: 'aprobar' | 'rechazar' } | null;

export function SolicitudesAdminPage() {
  const { data: solicitudes, isLoading } = useSolicitudesPendientes();
  const { mutateAsync: resolver, isPending } = useResolverSolicitud();
  const [accion, setAccion] = useState<Accion>(null);
  const [motivo, setMotivo] = useState('');

  const cerrar = () => { setAccion(null); setMotivo(''); };

  const aprobar = async (id: number) => {
    await resolver({ id, decision: 'APROBAR' });
    cerrar();
  };

  const rechazar = async (e: React.FormEvent, id: number) => {
    e.preventDefault();
    await resolver({ id, decision: 'RECHAZAR', motivo: motivo.trim() });
    cerrar();
  };

  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader
        title="Solicitudes pendientes"
        description="Compara la descripción privada con el objeto antes de aprobar. Al aprobar, el estudiante podrá recogerlo."
      />

      {isLoading ? (
        <LoadingState label="Cargando solicitudes…" />
      ) : !solicitudes?.length ? (
        <EmptyState icon={ClipboardList} title="No hay solicitudes por revisar" description="Las nuevas reclamaciones de los estudiantes aparecerán aquí." />
      ) : (
        <ul className="panel divide-y divide-line">
          {solicitudes.map((sol) => {
            const activa = accion?.id === sol.id;
            return (
              <li key={sol.id} className="px-5 py-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <Link to={`/app/objetos/${sol.objetoId}`} className="font-semibold text-ink hover:text-brand-dark">
                      {sol.objetoTitulo}
                    </Link>
                    <p className="mt-1 text-[13px] text-ink-soft">Solicitud #{sol.id}, enviada el {formatDate(sol.fechaCreacion)}</p>
                  </div>

                  {activa && accion.tipo === 'aprobar' ? (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-ink-soft">¿Aprobar entrega?</span>
                      <button onClick={cerrar} className="btn btn-ghost px-3 py-2">No</button>
                      <button onClick={() => aprobar(sol.id)} disabled={isPending} className="btn btn-accent px-3 py-2">
                        Sí, aprobar
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <button onClick={() => setAccion({ id: sol.id, tipo: 'rechazar' })} disabled={isPending}
                        className="btn btn-ghost px-3 py-2 text-danger">
                        <X size={16} /> Rechazar
                      </button>
                      <button onClick={() => setAccion({ id: sol.id, tipo: 'aprobar' })} disabled={isPending}
                        className="btn btn-primary px-3 py-2">
                        <Check size={16} /> Aprobar
                      </button>
                    </div>
                  )}
                </div>

                {activa && accion.tipo === 'rechazar' && (
                  <form onSubmit={(e) => rechazar(e, sol.id)} className="pop-in mt-4 rounded-xl border border-danger/20 bg-danger/[.04] p-4" style={{ transformOrigin: 'top' }}>
                    <label className="label" htmlFor={`motivo-${sol.id}`}>Motivo del rechazo</label>
                    <input
                      id={`motivo-${sol.id}`} autoFocus required
                      value={motivo} onChange={(e) => setMotivo(e.target.value)}
                      className="field"
                      placeholder="Ej: Los detalles no coinciden con el objeto"
                    />
                    <p className="hint">El estudiante verá este motivo.</p>
                    <div className="mt-3 flex justify-end gap-2">
                      <button type="button" onClick={cerrar} className="btn btn-ghost px-3 py-2">Cancelar</button>
                      <button type="submit" disabled={isPending || !motivo.trim()} className="btn btn-danger px-3 py-2">
                        Rechazar solicitud
                      </button>
                    </div>
                  </form>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
