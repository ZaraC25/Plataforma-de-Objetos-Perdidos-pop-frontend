import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';
import type { ApiResponse } from '../types/api';
import { ShieldCheck } from 'lucide-react';

export function AuditoriaPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['auditoria'],
    queryFn: async () => {
      const res = await api.get<ApiResponse<{ content: any[] }>>('/admin/auditoria');
      return res.data.data?.content || [];
    }
  });

  if (isLoading) return <div className="text-center py-10">Cargando historial...</div>;

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <ShieldCheck className="text-blue-600" /> Registro de Auditoría
      </h1>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 font-semibold text-gray-600">Fecha</th>
              <th className="p-4 font-semibold text-gray-600">Usuario</th>
              <th className="p-4 font-semibold text-gray-600">Acción</th>
              <th className="p-4 font-semibold text-gray-600">Entidad</th>
              <th className="p-4 font-semibold text-gray-600">Resultado</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((a: any) => (
              <tr key={a.id} className="border-b last:border-0 hover:bg-gray-50">
                <td className="p-4 text-gray-500">{new Date(a.fechaHora).toLocaleString()}</td>
                <td className="p-4 font-medium">{a.usuarioResponsable?.nombre || 'Sistema'}</td>
                <td className="p-4 text-blue-600 font-semibold">{a.accion}</td>
                <td className="p-4">{a.entidadAfectada} #{a.registroAfectadoId}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${a.resultado === 'EXITO' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {a.resultado}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}