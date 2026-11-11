import { useSolicitudes } from '../features/recuperacion/api/useSolicitudes';
import { ClipboardList } from 'lucide-react';

export function MisSolicitudesPage() {
  const { data: solicitudes, isLoading } = useSolicitudes();

  if (isLoading) return <div className="text-center py-10">Cargando solicitudes...</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Mis Solicitudes de Recuperación</h1>

      {solicitudes?.length === 0 ? (
        <div className="bg-white p-10 rounded-lg shadow text-center text-gray-500 flex flex-col items-center">
          <ClipboardList size={48} className="mb-4 text-gray-400" />
          <p>No has realizado ninguna solicitud todavía.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {solicitudes?.map((sol) => (
            <div key={sol.id} className="bg-white p-5 rounded-lg shadow flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-gray-800">Solicitud #{sol.id}</h3>
                <p className="text-sm text-gray-600 mt-1">Para el objeto ID: {sol.objetoId}</p>
                <p className="text-xs text-gray-400 mt-1">
                  Enviada el: {new Date(sol.fechaCreacion).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold
                  ${sol.estado === 'APROBADA' ? 'bg-green-100 text-green-700' : 
                    sol.estado === 'RECHAZADA' ? 'bg-red-100 text-red-700' : 
                    'bg-yellow-100 text-yellow-700'}`}>
                  {sol.estado.replace(/_/g, ' ')}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}