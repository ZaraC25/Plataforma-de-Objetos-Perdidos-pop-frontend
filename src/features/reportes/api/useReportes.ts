import { useQuery } from '@tanstack/react-query';
import { api } from '../../../lib/api';
import type { ApiResponse } from '../../../types/api';

export interface Reporte {
  id: number;
  descripcion: string;
  categoria: string;
  fechaPerdida: string;
  ultimaUbicacion: string;
  estado: string;
}

export function useReportes() {
  return useQuery({
    queryKey: ['mis-reportes'],
    queryFn: async () => {
      const response = await api.get<ApiResponse<{ content: Reporte[] }>>('/reportes/mios');
      return response.data.data?.content || [];
    },
  });
}