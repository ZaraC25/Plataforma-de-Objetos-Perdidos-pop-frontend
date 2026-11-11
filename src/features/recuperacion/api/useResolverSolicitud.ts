import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../../lib/api';
import { toast } from 'sonner';

export function useResolverSolicitud() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, decision, motivo }: { id: number, decision: string, motivo?: string }) => {
      await api.patch(`/solicitudes/${id}/resolver`, { decision, motivo });
    },
    onSuccess: () => {
      toast.success('Solicitud procesada correctamente');
      queryClient.invalidateQueries({ queryKey: ['solicitudes-pendientes'] });
    },
    onError: () => {
      toast.error('Error al procesar la solicitud');
    }
  });
}