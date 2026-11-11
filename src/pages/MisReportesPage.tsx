import { Link } from 'react-router-dom';
import { useReportes } from '../features/reportes/api/useReportes';
import { Plus, SearchX } from 'lucide-react';

export function MisReportesPage() {
  const { data: reportes, isLoading } = useReportes();

  if (isLoading) return <div className="text-center py-10">Cargando tus reportes...</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Mis Reportes de Pérdida</h1>
        <Link 
          to="/mis-reportes/nuevo"
          className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 flex items-center gap-2 transition"
        >
          <Plus size={20} /> Nuevo Reporte
        </Link>
      </div>

      {reportes?.length === 0 ? (
        <div className="bg-white p-10 rounded-lg shadow text-center text-gray-500 flex flex-col items-center">
          <SearchX size={48} className="mb-4 text-gray-400" />
          <p>No has reportado ninguna pérdida todavía.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reportes?.map((rep) => (
            <div key={rep.id} className="bg-white p-5 rounded-lg shadow border-l-4 border-orange-500 flex justify-between items-center">
              <div>
                <span className="text-xs font-bold text-orange-600 uppercase bg-orange-50 px-2 py-1 rounded">
                  {rep.categoria}
                </span>
                <h3 className="text-lg font-bold text-gray-800 mt-2">{rep.descripcion}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  <strong>Última vez visto:</strong> {rep.ultimaUbicacion}
                </p>
              </div>
              <div className="text-right">
                <span className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-semibold">
                  {rep.estado.replace(/_/g, ' ')}
                </span>
                <p className="text-xs text-gray-400 mt-2">
                  {new Date(rep.fechaPerdida).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}