import { useState } from 'react';
import { useSolicitudesPendientes } from '../features/recuperacion/api/useSolicitudesPendientes';
import { useResolverSolicitud } from '../features/recuperacion/api/useResolverSolicitud';
import { CheckCircle, XCircle, FileWarning } from 'lucide-react';

export function SolicitudesAdminPage() {
  const { data: solicitudes, isLoading } = useSolicitudesPendientes();
  const { mutateAsync: resolver, isPending } = useResolverSolicitud();
  const [rechazoId, setRechazoId] = useState<number | null>(null);
  const [motivo, setMotivo] = useState('');

  if (isLoading) return <div className="text-center py-10">Cargando solicitudes...</div>;

  const handleAprobar = async (id: number) => {
    if(confirm('¿Estás seguro de aprobar esta solicitud?')) {
      await resolver({ id, decision: 'APROBAR' });
    }
  };

  const handleRechazar = async (id: number) => {
    if (!motivo) return alert('Escribe un motivo de rechazo');
    await resolver({ id, decision: 'RECHAZAR', motivo });
    setRechazoId(null);
    setMotivo('');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Gestión de Solicitudes Pendientes</h1>

      {solicitudes?.length === 0 ? (
        <div className="bg-white p-10 rounded-lg shadow text-center text-gray-500 flex flex-col items-center">
          <FileWarning size={48} className="mb-4 text-gray-400" />
          <p>No hay solicitudes pendientes por revisar.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {solicitudes?.map((sol) => (
            <div key={sol.id} className="bg-white p-5 rounded-lg shadow border-l-4 border-yellow-500">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold text-gray-800">Solicitud #{sol.id}</h3>
                  <p className="text-sm text-gray-600 mt-1">Objeto: <strong>{sol.objetoTitulo}</strong></p>
                  <p className="text-xs text-gray-400 mt-1">Enviada el: {new Date(sol.fechaCreacion).toLocaleDateString()}</p>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleAprobar(sol.id)}
                    disabled={isPending}
                    className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition"
                    title="Aprobar"
                  >
                    <CheckCircle size={20} />
                  </button>
                  <button 
                    onClick={() => setRechazoId(sol.id)}
                    disabled={isPending}
                    className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition"
                    title="Rechazar"
                  >
                    <XCircle size={20} />
                  </button>
                </div>
              </div>

              {/* Formulario de rechazo */}
              {rechazoId === sol.id && (
                <div className="mt-4 p-4 bg-red-50 rounded border border-red-200">
                  <label className="block text-sm font-medium text-red-800 mb-1">Motivo del rechazo</label>
                  <input 
                    type="text" 
                    value={motivo}
                    onChange={(e) => setMotivo(e.target.value)}
                    className="w-full px-3 py-2 border rounded text-sm mb-2"
                    placeholder="Ej: Las características no coinciden..."
                  />
                  <button 
                    onClick={() => handleRechazar(sol.id)}
                    className="bg-red-600 text-white px-4 py-2 rounded text-sm hover:bg-red-700"
                  >
                    Confirmar Rechazo
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}