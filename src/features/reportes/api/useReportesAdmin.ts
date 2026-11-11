import { useQuery } from '@tanstack/react-query';
import { api } from '../../../lib/api';
import type { ApiResponse } from '../../../types/api';
import type { Reporte } from './useReportes';

export function useReportesAdmin() {
  return useQuery({
    queryKey: ['reportes-admin'],
    queryFn: async () => {
      const response = await api.get<ApiResponse<{ content: Reporte[] }>>('/reportes/todos');
      return response.data.data?.content || [];
    },
  });
}