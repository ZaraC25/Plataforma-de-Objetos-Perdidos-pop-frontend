import { useQuery } from '@tanstack/react-query';
import { api } from '../../../lib/api';
import type { ApiResponse } from '../../../types/api';
import type { Solicitud } from './useSolicitudes';

export function useSolicitudesPendientes() {
  return useQuery({
    queryKey: ['solicitudes-pendientes'],
    queryFn: async () => {
      const response = await api.get<ApiResponse<{ content: Solicitud[] }>>('/solicitudes/pendientes');
      return response.data.data?.content || [];
    },
  });
}