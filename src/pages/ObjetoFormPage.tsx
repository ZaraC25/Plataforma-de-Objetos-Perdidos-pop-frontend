import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCrearObjeto } from '../features/objetos/api/useCrearObjeto';
import { ArrowLeft, Save } from 'lucide-react';

export function ObjetoFormPage() {
  const navigate = useNavigate();
  const { mutateAsync: crearObjeto, isPending } = useCrearObjeto();

  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    categoria: 'ELECTRONICA',
    fechaHallazgo: new Date().toISOString().slice(0, 16), // YYYY-MM-DDTHH:mm
    ubicacion: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await crearObjeto(formData);
    navigate('/'); // Volver al catálogo
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <div className="flex items-center gap-4 mb-6 border-b pb-4">
        <button onClick={() => navigate('/')} className="text-gray-500 hover:text-blue-600">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Registrar Objeto Encontrado</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Título del objeto</label>
          <input
            type="text" required
            value={formData.titulo}
            onChange={e => setFormData({...formData, titulo: e.target.value})}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Ej: MacBook Pro gris"
          />
        </div>

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
              <option value="DEPORTES">Deportes</option>
              <option value="OTROS">Otros</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de hallazgo</label>
            <input
              type="datetime-local" required
              value={formData.fechaHallazgo}
              onChange={e => setFormData({...formData, fechaHallazgo: e.target.value})}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Ubicación exacta</label>
          <input
            type="text" required
            value={formData.ubicacion}
            onChange={e => setFormData({...formData, ubicacion: e.target.value})}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Ej: Bloque B, salón 204"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Descripción detallada</label>
          <textarea
            required rows={4}
            value={formData.descripcion}
            onChange={e => setFormData({...formData, descripcion: e.target.value})}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Describe características que ayuden a identificar el objeto..."
          />
        </div>

        <button
          type="submit" disabled={isPending}
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 flex justify-center items-center gap-2 disabled:bg-blue-400"
        >
          <Save size={20} />
          {isPending ? 'Guardando...' : 'Registrar Objeto'}
        </button>
      </form>
    </div>
  );
}