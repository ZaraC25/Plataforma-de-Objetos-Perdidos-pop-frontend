import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCrearReporte } from '../features/reportes/api/useCrearReporte';
import { ArrowLeft, Save, Sparkles, CheckCircle } from 'lucide-react';
import { api } from '../lib/api';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

export function ReporteFormPage() {
  const navigate = useNavigate();
  const { mutateAsync: crearReporte, isPending } = useCrearReporte();
  const [sugerencias, setSugerencias] = useState<any[]>([]);
  const [buscandoIA, setBuscandoIA] = useState(false);

  const [formData, setFormData] = useState({
    descripcion: '',
    categoria: 'ELECTRONICA',
    fechaPerdida: new Date().toISOString().slice(0, 16),
    ultimaUbicacion: ''
  });

  const handleBuscarIA = async () => {
    if (!formData.descripcion || formData.descripcion.length < 10) {
      toast.error('Escribe una descripción más detallada para que la IA pueda buscar.');
      return;
    }
    
    setBuscandoIA(true);
    try {
      const res = await api.get(`/coincidencias/buscar?descripcion=${encodeURIComponent(formData.descripcion)}`);
      const data = res.data.data;
      // Parseamos el JSON que devuelve la IA (ej. "[1, 5]")
      let ids: number[] = [];
      try { ids = JSON.parse(data); } catch(e) { console.error("Formato IA inválido", data); }

      if (ids.length > 0) {
        // Buscar los detalles de esos IDs para mostrarlos
        const objetosEncontrados = await Promise.all(ids.map(id => api.get(`/objetos/${id}`)));
        setSugerencias(objetosEncontrados.map(r => r.data.data));
        toast.success('¡La IA encontró posibles coincidencias!');
      } else {
        setSugerencias([]);
        toast.info('La IA no encontró coincidencias por ahora.');
      }
    } catch (error) {
      toast.error('Error al conectar con la IA.');
    } finally {
      setBuscandoIA(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await crearReporte(formData);
    navigate('/mis-reportes');
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md mb-10">
      <div className="flex items-center gap-4 mb-6 border-b pb-4">
        <button onClick={() => navigate('/mis-reportes')} className="text-gray-500 hover:text-blue-600">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Reportar Objeto Perdido</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* ... (Campos anteriores de categoría y fecha se mantienen igual) ... */}
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Descripción del objeto perdido</label>
          <textarea
            required rows={4}
            value={formData.descripcion}
            onChange={e => setFormData({...formData, descripcion: e.target.value})}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Describe tu objeto con el mayor detalle posible..."
          />
        </div>

        {/* BOTÓN MÁGICO DE IA */}
        <button
          type="button"
          onClick={handleBuscarIA}
          disabled={buscandoIA}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white py-2 rounded-md hover:opacity-90 flex justify-center items-center gap-2 transition shadow-lg"
        >
          <Sparkles size={20} />
          {buscandoIA ? 'La IA está analizando...' : 'Buscar Coincidencias con Inteligencia Artificial'}
        </button>

        {/* RESULTADOS DE LA IA */}
        {sugerencias.length > 0 && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-bold text-blue-800 mb-3 flex items-center gap-2">
              <CheckCircle size={18} /> ¡Posibles Coincidencias Encontradas!
            </h3>
            <div className="space-y-3">
              {sugerencias.map(obj => (
                <Link to={`/app/objetos/${obj.id}`} key={obj.id} className="block bg-white p-3 rounded border hover:shadow transition">
                  <p className="font-semibold text-gray-800">{obj.titulo}</p>
                  <p className="text-xs text-gray-500">{obj.ubicacion}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        <button
          type="submit" disabled={isPending}
          className="w-full bg-orange-500 text-white py-3 rounded-md hover:bg-orange-600 flex justify-center items-center gap-2 transition disabled:bg-orange-300 mt-4"
        >
          <Save size={20} />
          {isPending ? 'Enviando reporte...' : 'Enviar Reporte'}
        </button>
      </form>
    </div>
  );
}