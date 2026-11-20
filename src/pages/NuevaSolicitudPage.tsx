import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCrearSolicitud } from '../features/recuperacion/api/useCrearSolicitud';
import { Loader2, Lock } from 'lucide-react';
import { PageHeader, Field } from '../components/ui';

export function NuevaSolicitudPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { mutateAsync: crearSolicitud, isPending } = useCrearSolicitud();

  const [descripcionPrivada, setDescripcionPrivada] = useState('');
  const [evidencia, setEvidencia] = useState<File | undefined>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await crearSolicitud({ objetoId: Number(id), descripcionPrivada, evidencia });
    navigate('/app/mis-solicitudes');
  };

  return (
    <div className="mx-auto max-w-2xl">
      <PageHeader
        title="Reclamar objeto"
        description="El encargado comparará tu descripción con el objeto antes de aprobar la entrega."
        backTo={{ to: `/app/objetos/${id}`, label: 'Volver al objeto' }}
      />

      <form onSubmit={handleSubmit} className="panel space-y-5 p-6 sm:p-8">
        <div className="flex gap-3 rounded-xl bg-paper p-4 text-sm text-ink-soft">
          <Lock size={18} className="mt-0.5 shrink-0 text-brand-dark" />
          <p>
            Lo que escribas aquí es <strong className="text-ink">privado</strong>: solo lo ve el encargado. Describe
            detalles que solo el dueño conoce, como marcas, contenido o daños.
          </p>
        </div>

        <Field label="Detalles que prueban que es tuyo" htmlFor="privada">
          <textarea
            id="privada" required rows={5}
            value={descripcionPrivada}
            onChange={(e) => setDescripcionPrivada(e.target.value)}
            className="field resize-y"
            placeholder="Ej: Tiene un rayón en la esquina inferior izquierda y una foto de mi perro como fondo de pantalla."
          />
        </Field>

        <Field label="Evidencia (opcional)" htmlFor="evidencia" hint="Una foto tuya con el objeto o la factura de compra. Imagen o PDF.">
          <input
            id="evidencia" type="file" accept="image/*,application/pdf"
            onChange={(e) => setEvidencia(e.target.files?.[0])}
            className="field"
          />
        </Field>

        <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
          <button type="button" onClick={() => navigate(-1)} className="btn btn-ghost">Cancelar</button>
          <button type="submit" disabled={isPending} className="btn btn-primary">
            {isPending && <Loader2 size={16} className="animate-spin" />}
            {isPending ? 'Enviando…' : 'Enviar solicitud'}
          </button>
        </div>
      </form>
    </div>
  );
}
