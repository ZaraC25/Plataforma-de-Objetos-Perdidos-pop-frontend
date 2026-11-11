import { useQuery } from '@tanstack/react-query';
import { api } from '../../../lib/api';
import type { ApiResponse } from '../../../types/api';
import type { Objeto, PageResponse } from '../../../types/objeto';

export function useObjetos() {
  return useQuery({
    queryKey: ['objetos'],
    queryFn: async () => {
      const response = await api.get<ApiResponse<PageResponse<Objeto>>>('/objetos');
      return response.data.data?.content || [];
    },
  });
}