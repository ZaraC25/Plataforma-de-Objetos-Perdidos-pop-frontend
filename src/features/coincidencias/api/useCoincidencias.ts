import { useQuery } from '@tanstack/react-query';
import { api } from '../../../lib/api';
import type { ApiResponse } from '../../../types/api';

export interface Coincidencia {
  reporteId: number;
  reporteDescripcion: string;
  reporteCategoria: string;
  reporteUltimaUbicacion: string;
  reporteUsuarioNombre: string;
  reporteUsuarioCorreo: string;
  objetoId: number;
  objetoTitulo: string;
  objetoDescripcion: string;
  objetoCategoria: string;
  objetoUbicacion: string;
}

export function useCoincidenciasMisReportes(enabled: boolean) {
  return useQuery({
    queryKey: ['coincidencias-mis-reportes'],
    queryFn: async () => {
      const response = await api.get<ApiResponse<Coincidencia[]>>('/coincidencias/mis-reportes');
      return response.data.data || [];
    },
    enabled,
    staleTime: 1000 * 60 * 2, // 2 minutos de caché
    retry: false, // cada reintento es otra llamada a Gemini (límite por minuto)
  });
}

export function useCoincidenciasTodos(enabled: boolean) {
  return useQuery({
    queryKey: ['coincidencias-todos'],
    queryFn: async () => {
      const response = await api.get<ApiResponse<Coincidencia[]>>('/coincidencias/todos');
      return response.data.data || [];
    },
    enabled,
    staleTime: 1000 * 60 * 2,
    retry: false,
  });
}
