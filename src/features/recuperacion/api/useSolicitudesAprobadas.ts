import { useQuery } from '@tanstack/react-query';
import { api } from '../../../lib/api';
import type { ApiResponse } from '../../../types/api';
import type { Solicitud } from './useSolicitudes';

export function useSolicitudesAprobadas() {
  return useQuery({
    queryKey: ['solicitudes-aprobadas'],
    queryFn: async () => {
      const response = await api.get<ApiResponse<{ content: Solicitud[] }>>('/solicitudes/aprobadas');
      return response.data.data?.content || [];
    },
  });
}