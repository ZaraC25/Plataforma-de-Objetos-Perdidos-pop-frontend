import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';
import type { ApiResponse } from '../types/api';
import { Package, Users, CheckCircle, Clock } from 'lucide-react';

export function EstadisticasPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['estadisticas'],
    queryFn: async () => {
      const res = await api.get<ApiResponse<any>>('/admin/estadisticas');
      return res.data.data;
    }
  });

  if (isLoading) return <div className="text-center py-10">Cargando estadísticas...</div>;

  const tarjetas = [
    { titulo: 'Total Usuarios', valor: data?.totalUsuarios || 0, icono: Users, color: 'bg-blue-500' },
    { titulo: 'Objetos Registrados', valor: data?.totalObjetos || 0, icono: Package, color: 'bg-purple-500' },
    { titulo: 'Objetos Entregados', valor: data?.objetosEntregados || 0, icono: CheckCircle, color: 'bg-green-500' },
    { titulo: 'Solicitudes Pendientes', valor: data?.solicitudesPendientes || 0, icono: Clock, color: 'bg-orange-500' },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard de Estadísticas</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tarjetas.map((t, i) => (
          <div key={i} className="bg-white p-6 rounded-lg shadow border-t-4" style={{ borderTopColor: t.color.replace('bg-', '') }}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm font-medium">{t.titulo}</p>
                <p className="text-4xl font-bold text-gray-800 mt-2">{t.valor}</p>
              </div>
              <div className={`p-3 rounded-lg text-white ${t.color}`}>
                <t.icono size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}