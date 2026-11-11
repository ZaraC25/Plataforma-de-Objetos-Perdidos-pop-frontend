import { Link } from 'react-router-dom';
import { useObjetos } from '../features/objetos/api/useObjetos';
import { PackageOpen, Plus, SearchX } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';

export function ObjetosPage() {
  const { data: objetos, isLoading, isError } = useObjetos();
  const usuario = useAuthStore((state) => state.usuario);

  if (isLoading) return <div className="text-center py-10 text-gray-500">Cargando catálogo...</div>;
  if (isError) return <div className="text-center py-10 text-red-500">Error al cargar los objetos.</div>;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Catálogo de Objetos</h1>
        
        {/* BOTÓN DINÁMICO SEGÚN EL ROL */}
        {(usuario?.rol === 'ADMINISTRADOR' || usuario?.rol === 'ENCARGADO_OBJETOS_PERDIDOS') ? (
          <Link 
            to="/encargado/objetos/nuevo"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2 transition"
          >
            <Plus size={20} /> Registrar Objeto Encontrado
          </Link>
        ) : (
          <Link 
            to="/mis-reportes/nuevo"
            className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 flex items-center gap-2 transition"
          >
            <SearchX size={20} /> Reportar Objeto Perdido
          </Link>
        )}
      </div>

      {objetos?.length === 0 ? (
        <div className="bg-white p-10 rounded-lg shadow text-center text-gray-500 flex flex-col items-center">
          <PackageOpen size={48} className="mb-4 text-gray-400" />
          <p>No hay objetos registrados por el momento.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {objetos?.map((obj) => (
            <Link to={`/objetos/${obj.id}`} key={obj.id} className="block group">
              <div className="bg-white rounded-lg shadow hover:shadow-lg transition-all duration-200 p-5 border-t-4 border-blue-500 group-hover:-translate-y-1">
                <span className="text-xs font-bold text-blue-600 uppercase bg-blue-50 px-2 py-1 rounded">
                  {obj.categoria}
                </span>
                <h3 className="text-lg font-bold text-gray-800 mt-2 group-hover:text-blue-600 transition">{obj.titulo}</h3>
                <p className="text-gray-600 text-sm mt-2 line-clamp-2">{obj.descripcion}</p>
                <div className="mt-4 pt-4 border-t text-sm text-gray-500">
                  <p><strong>Ubicación:</strong> {obj.ubicacion}</p>
                  <p><strong>Estado:</strong> {obj.estado.replace(/_/g, ' ')}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}