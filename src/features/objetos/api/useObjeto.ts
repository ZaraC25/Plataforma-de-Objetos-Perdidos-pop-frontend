import { useQuery } from '@tanstack/react-query';
import { api } from '../../../lib/api';
import type { ApiResponse } from '../../../types/api';
import type { Objeto } from '../../../types/objeto';

export function useObjeto(id: number) {
  return useQuery({
    queryKey: ['objeto', id],
    queryFn: async () => {
      const response = await api.get<ApiResponse<Objeto>>(`/objetos/${id}`);
      return response.data.data;
    },
    enabled: !!id, 
  });
}