import { useSolicitudesAprobadas } from '../features/recuperacion/api/useSolicitudesAprobadas';
import { useRegistrarEntrega } from '../features/recuperacion/api/useRegistrarEntrega';
import { PackageCheck, CheckCircle } from 'lucide-react';

export function EntregasPage() {
  const { data: solicitudes, isLoading } = useSolicitudesAprobadas();
  const { mutateAsync: registrarEntrega, isPending } = useRegistrarEntrega();

  if (isLoading) return <div className="text-center py-10">Cargando entregas pendientes...</div>;

  const handleEntregar = async (id: number) => {
    if(confirm('¿Confirmas que has entregado el objeto físico al estudiante?')) {
      await registrarEntrega({ solicitudId: id });
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Registro de Entregas (Objetos Aprobados)</h1>

      {solicitudes?.length === 0 ? (
        <div className="bg-white p-10 rounded-lg shadow text-center text-gray-500 flex flex-col items-center">
          <PackageCheck size={48} className="mb-4 text-gray-400" />
          <p>No hay objetos pendientes por entregar.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {solicitudes?.map((sol) => (
            <div key={sol.id} className="bg-white p-5 rounded-lg shadow border-l-4 border-green-500 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-gray-800">Solicitud #{sol.id}</h3>
                <p className="text-sm text-gray-600 mt-1">Objeto: <strong>{sol.objetoTitulo}</strong></p>
                <p className="text-xs text-gray-400 mt-1">Aprobada el: {new Date(sol.fechaCreacion).toLocaleDateString()}</p>
              </div>
              <button 
                onClick={() => handleEntregar(sol.id)}
                disabled={isPending}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center gap-2 transition"
              >
                <CheckCircle size={20} /> Registrar Entrega
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}