import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCrearReporte } from '../features/reportes/api/useCrearReporte';
import { Loader2 } from 'lucide-react';
import { PageHeader, Field, CATEGORIAS, nowLocal } from '../components/ui';

export function ReporteFormPage() {
  const navigate = useNavigate();
  const { mutateAsync: crearReporte, isPending } = useCrearReporte();
  const [formData, setFormData] = useState({
    descripcion: '',
    categoria: 'ELECTRONICA',
    fechaPerdida: nowLocal(),
    ultimaUbicacion: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await crearReporte(formData);
    navigate('/app/mis-reportes');
  };

  return (
    <div className="mx-auto max-w-2xl pb-10">
      <PageHeader
        title="Reportar objeto perdido"
        description="Describe tu objeto con detalle. Puedes revisar posibles coincidencias en Coincidencias IA."
        backTo={{ to: '/app/mis-reportes', label: 'Mis reportes' }}
      />

      <form onSubmit={handleSubmit} className="panel space-y-5 p-6 sm:p-8">
        <Field label="¿Qué perdiste?" htmlFor="descripcion" hint="Incluye color, marca, tamaño y cualquier rasgo visible.">
          <textarea
            id="descripcion" required rows={4}
            value={formData.descripcion}
            onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
            className="field resize-y"
            placeholder="Ej: Botella metálica verde con una calcomanía de la universidad"
          />
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Categoría" htmlFor="categoria">
            <select id="categoria" value={formData.categoria}
              onChange={(e) => setFormData({ ...formData, categoria: e.target.value })} className="field">
              {CATEGORIAS.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
          </Field>
          <Field label="Cuándo lo perdiste" htmlFor="fecha">
            <input id="fecha" type="datetime-local" required value={formData.fechaPerdida}
              onChange={(e) => setFormData({ ...formData, fechaPerdida: e.target.value })} className="field" />
          </Field>
        </div>

        <Field label="Dónde lo viste por última vez" htmlFor="ubicacion">
          <input id="ubicacion" type="text" required value={formData.ultimaUbicacion}
            onChange={(e) => setFormData({ ...formData, ultimaUbicacion: e.target.value })}
            className="field" placeholder="Ej: Cafetería central" />
        </Field>

        <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
          <button type="button" onClick={() => navigate('/app/mis-reportes')} className="btn btn-ghost">Cancelar</button>
          <button type="submit" disabled={isPending} className="btn btn-primary">
            {isPending && <Loader2 size={16} className="animate-spin" />}
            {isPending ? 'Enviando…' : 'Enviar reporte'}
          </button>
        </div>
      </form>
    </div>
  );
}
