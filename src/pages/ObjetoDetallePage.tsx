import { useParams, useNavigate } from 'react-router-dom';
import { useObjeto } from '../features/objetos/api/useObjeto';
import { ArrowLeft, MapPin, Calendar, Tag, ShieldAlert } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';

export function ObjetoDetallePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const usuario = useAuthStore((state) => state.usuario);
  
  const { data: objeto, isLoading, isError } = useObjeto(Number(id));

  if (isLoading) return <div className="text-center py-20">Cargando detalle...</div>;
  if (isError || !objeto) return <div className="text-center py-20 text-red-500">Objeto no encontrado.</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <button 
        onClick={() => navigate('/')} 
        className="flex items-center gap-2 text-gray-500 hover:text-blue-600 mb-6 transition"
      >
        <ArrowLeft size={20} /> Volver al catálogo
      </button>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-blue-900 p-8 text-white">
          <div className="flex justify-between items-start">
            <div>
              <span className="inline-flex items-center gap-1 bg-blue-800 px-3 py-1 rounded-full text-xs font-semibold mb-3 uppercase tracking-wide">
                <Tag size={14} /> {objeto.categoria}
              </span>
              <h1 className="text-3xl font-bold">{objeto.titulo}</h1>
            </div>
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-sm">
              {objeto.estado.replace(/_/g, ' ')}
            </span>
          </div>
        </div>

        <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Descripción</h3>
              <p className="text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-lg border">
                {objeto.descripcion}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg border">
              <MapPin className="text-blue-600 mt-1" size={20} />
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase">Ubicación</p>
                <p className="text-gray-800 font-semibold">{objeto.ubicacion}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg border">
              <Calendar className="text-blue-600 mt-1" size={20} />
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase">Fecha Hallazgo</p>
                <p className="text-gray-800 font-semibold">
                  {new Date(objeto.fechaHallazgo).toLocaleDateString()}
                </p>
              </div>
            </div>

            {usuario?.rol === 'ESTUDIANTE' && objeto.estado === 'DISPONIBLE_PARA_RECLAMACION' && (
              <button 
                onClick={() => navigate(`/solicitudes/nueva/${objeto.id}`)}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition shadow-md"
              >
                <ShieldAlert size={20} /> Solicitar Recuperación
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}