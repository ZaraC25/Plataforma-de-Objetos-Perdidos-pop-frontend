import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCrearReporte } from '../features/reportes/api/useCrearReporte';
import { ArrowLeft, Save } from 'lucide-react';

export function ReporteFormPage() {
  const navigate = useNavigate();
  const { mutateAsync: crearReporte, isPending } = useCrearReporte();

  const [formData, setFormData] = useState({
    descripcion: '',
    categoria: 'ELECTRONICA',
    fechaPerdida: new Date().toISOString().slice(0, 16),
    ultimaUbicacion: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await crearReporte(formData);
    navigate('/mis-reportes');
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <div className="flex items-center gap-4 mb-6 border-b pb-4">
        <button onClick={() => navigate('/mis-reportes')} className="text-gray-500 hover:text-blue-600">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Reportar Objeto Perdido</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
            <select
              value={formData.categoria}
              onChange={e => setFormData({...formData, categoria: e.target.value})}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="ELECTRONICA">Electrónica</option>
              <option value="DOCUMENTOS">Documentos</option>
              <option value="ROPA">Ropa</option>
              <option value="ACCESORIOS">Accesorios</option>
              <option value="LLAVES">Llaves</option>
              <option value="CARTERAS_BOLSOS">Carteras / Bolsos</option>
              <option value="LIBROS_APUNTES">Libros / Apuntes</option>
              <option value="OTROS">Otros</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha en que lo perdiste</label>
            <input
              type="datetime-local" required
              value={formData.fechaPerdida}
              onChange={e => setFormData({...formData, fechaPerdida: e.target.value})}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Última ubicación conocida</label>
          <input
            type="text" required
            value={formData.ultimaUbicacion}
            onChange={e => setFormData({...formData, ultimaUbicacion: e.target.value})}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Ej: Cafetería central"
          />
        </div>

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

        <button
          type="submit" disabled={isPending}
          className="w-full bg-orange-500 text-white py-3 rounded-md hover:bg-orange-600 flex justify-center items-center gap-2 transition disabled:bg-orange-300"
        >
          <Save size={20} />
          {isPending ? 'Enviando reporte...' : 'Enviar Reporte'}
        </button>
      </form>
    </div>
  );
}