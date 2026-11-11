import { useQuery } from '@tanstack/react-query';
import { api } from '../../../lib/api';
import type { ApiResponse } from '../../../types/api';

export interface Solicitud {
  id: number;
  objetoId: number;
  objetoTitulo: string;
  estado: string;
  fechaCreacion: string;
}

export function useSolicitudes() {
  return useQuery({
    queryKey: ['mis-solicitudes'],
    queryFn: async () => {
      const response = await api.get<ApiResponse<{ content: Solicitud[] }>>('/solicitudes/mias');
      return response.data.data?.content || [];
    },
  });
}