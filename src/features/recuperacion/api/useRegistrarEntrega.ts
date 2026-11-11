import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../../lib/api';
import { toast } from 'sonner';

export function useRegistrarEntrega() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ solicitudId }: { solicitudId: number }) => {
      await api.post('/entregas', { 
        solicitudId, 
        confirmacionRecepcion: true 
      });
    },
    onSuccess: () => {
      toast.success('¡Entrega registrada exitosamente!');
      queryClient.invalidateQueries({ queryKey: ['solicitudes-aprobadas'] });
      queryClient.invalidateQueries({ queryKey: ['solicitudes-pendientes'] });
      queryClient.invalidateQueries({ queryKey: ['objetos'] }); // Para que el catálogo se actualice
    },
    onError: () => {
      toast.error('Error al registrar la entrega');
    }
  });
}