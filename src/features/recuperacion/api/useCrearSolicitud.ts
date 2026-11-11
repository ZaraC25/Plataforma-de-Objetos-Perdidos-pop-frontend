import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../../lib/api';
import { toast } from 'sonner';

interface CrearSolicitudData {
  objetoId: number;
  descripcionPrivada: string;
  evidencia?: File;
}

export function useCrearSolicitud() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CrearSolicitudData) => {
      const formData = new FormData();
      formData.append('objetoId', data.objetoId.toString());
      formData.append('descripcionPrivada', data.descripcionPrivada);
      
      if (data.evidencia) {
        formData.append('evidencia', data.evidencia);
      }

      const response = await api.post('/solicitudes', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data.data;
    },
    onSuccess: () => {
      toast.success('¡Solicitud enviada! Espera la revisión del encargado.');
      queryClient.invalidateQueries({ queryKey: ['mis-solicitudes'] });
    },
    onError: (error: any) => {
      console.error(error);
      // Si hay un error, lo mostramos, pero ya no nos sacará al login
    }
  });
}