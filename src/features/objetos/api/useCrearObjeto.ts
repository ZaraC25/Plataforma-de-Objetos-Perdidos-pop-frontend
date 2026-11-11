import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../../lib/api';
import type { ApiResponse } from '../../../types/api';
import { toast } from 'sonner';

interface CrearObjetoData {
  titulo: string;
  descripcion: string;
  categoria: string;
  fechaHallazgo: string;
  ubicacion: string;
}

export function useCrearObjeto() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CrearObjetoData) => {
      const response = await api.post<ApiResponse<any>>('/objetos', data);
      return response.data.data;
    },
    onSuccess: () => {
      toast.success('¡Objeto registrado exitosamente!');
      // Esto refresca la lista automáticamente
      queryClient.invalidateQueries({ queryKey: ['objetos'] });
    },
    onError: (error: any) => {
      const msg = error.response?.data?.message || 'Error al registrar objeto';
      toast.error(msg);
    }
  });
}