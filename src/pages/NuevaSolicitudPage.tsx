import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCrearSolicitud } from '../features/recuperacion/api/useCrearSolicitud';
import { ArrowLeft, Send } from 'lucide-react';

export function NuevaSolicitudPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { mutateAsync: crearSolicitud, isPending } = useCrearSolicitud();

  const [descripcionPrivada, setDescripcionPrivada] = useState('');
  const [evidencia, setEvidencia] = useState<File | undefined>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await crearSolicitud({
      objetoId: Number(id),
      descripcionPrivada,
      evidencia
    });
    navigate('/mis-solicitudes');
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <div className="flex items-center gap-4 mb-6 border-b pb-4">
        <button onClick={() => navigate(-1)} className="text-gray-500 hover:text-blue-600">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Reclamar Objeto</h1>
      </div>

      <p className="text-sm text-gray-600 mb-6 bg-blue-50 p-4 rounded border border-blue-100">
        Para que el encargado apruebe tu solicitud, debes describir características <strong>privadas</strong> del objeto (detalles que solo el dueño conoce) y adjuntar una foto o factura si es posible.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Descripción privada de tu propiedad</label>
          <textarea
            required rows={5}
            value={descripcionPrivada}
            onChange={e => setDescripcionPrivada(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Ej: Tiene un rayón en la esquina inferior izquierda. La contraseña de encendido es 1234..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Evidencia (Opcional)</label>
          <input
            type="file"
            accept="image/*, application/pdf"
            onChange={e => setEvidencia(e.target.files?.[0])}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50"
          />
          <p className="text-xs text-gray-500 mt-1">Sube una foto del objeto o una factura de compra.</p>
        </div>

        <button
          type="submit" disabled={isPending}
          className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 flex justify-center items-center gap-2 transition disabled:bg-green-300"
        >
          <Send size={20} />
          {isPending ? 'Enviando solicitud...' : 'Enviar Solicitud'}
        </button>
      </form>
    </div>
  );
}