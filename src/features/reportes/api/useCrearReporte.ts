import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../../lib/api';
import { toast } from 'sonner';

interface CrearReporteData {
  descripcion: string;
  categoria: string;
  fechaPerdida: string;
  ultimaUbicacion: string;
}

export function useCrearReporte() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CrearReporteData) => {
      const response = await api.post('/reportes', data);
      return response.data.data;
    },
    onSuccess: () => {
      toast.success('¡Reporte de pérdida creado exitosamente!');
      queryClient.invalidateQueries({ queryKey: ['mis-reportes'] });
    },
    onError: () => {
      toast.error('Error al crear el reporte');
    }
  });
}