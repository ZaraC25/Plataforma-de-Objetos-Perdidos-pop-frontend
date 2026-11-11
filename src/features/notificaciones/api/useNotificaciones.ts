import { useQuery } from '@tanstack/react-query';
import { api } from '../../../lib/api';
import type { ApiResponse } from '../../../types/api';

export interface Notificacion {
  id: number;
  tipo: string;
  mensaje: string;
  leida: boolean;
  fechaCreacion: string;
}

export function useNotificaciones() {
  return useQuery({
    queryKey: ['notificaciones'],
    queryFn: async () => {
      const response = await api.get<ApiResponse<{ content: Notificacion[] }>>('/notificaciones?leida=false');
      return response.data.data?.content || [];
    },
    refetchInterval: 30000, // Se actualiza cada 30 segundos
  });
}