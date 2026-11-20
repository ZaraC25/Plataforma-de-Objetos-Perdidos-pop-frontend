import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCrearReporte } from '../features/reportes/api/useCrearReporte';
import { Sparkles, Loader2, MapPin } from 'lucide-react';
import { api } from '../lib/api';
import { toast } from 'sonner';
import { PageHeader, Field, CATEGORIAS, folio, nowLocal } from '../components/ui';
import type { Objeto } from '../types/objeto';

export function ReporteFormPage() {
  const navigate = useNavigate();
  const { mutateAsync: crearReporte, isPending } = useCrearReporte();
  const [sugerencias, setSugerencias] = useState<Objeto[]>([]);
  const [buscandoIA, setBuscandoIA] = useState(false);
  const [buscado, setBuscado] = useState(false);

  const [formData, setFormData] = useState({
    descripcion: '',
    categoria: 'ELECTRONICA',
    fechaPerdida: nowLocal(),
    ultimaUbicacion: '',
  });

  const handleBuscarIA = async () => {
    if (formData.descripcion.trim().length < 10) {
      toast.error('Escribe al menos 10 caracteres en la descripción para buscar coincidencias.');
      return;
    }

    setBuscandoIA(true);
    try {
      const res = await api.get(`/coincidencias/buscar?descripcion=${encodeURIComponent(formData.descripcion)}`);
      const data = res.data.data;
      // La IA devuelve un JSON con IDs, ej. "[1, 5]"
      let ids: number[] = [];
      try {
        ids = typeof data === 'string' ? JSON.parse(data) : data ?? [];
      } catch {
        console.error('Formato de respuesta de IA inválido', data);
      }

      if (ids.length > 0) {
        const objetos = await Promise.all(ids.map((id) => api.get(`/objetos/${id}`)));
        setSugerencias(objetos.map((r) => r.data.data));
      } else {
        setSugerencias([]);
      }
      setBuscado(true);
    } catch {
      toast.error('No se pudo buscar coincidencias. Intenta de nuevo en unos segundos.');
    } finally {
      setBuscandoIA(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await crearReporte(formData);
    navigate('/app/mis-reportes');
  };

  return (
    <div className="mx-auto max-w-2xl pb-10">
      <PageHeader
        title="Reportar objeto perdido"
        description="Antes de enviar el reporte, revisa si alguien ya lo entregó en la oficina."
        backTo={{ to: '/app/mis-reportes', label: 'Mis reportes' }}
      />

      <form onSubmit={handleSubmit} className="panel space-y-5 p-6 sm:p-8">
        <Field label="¿Qué perdiste?" htmlFor="descripcion" hint="Incluye color, marca, tamaño y cualquier rasgo visible.">
          <textarea
            id="descripcion" required rows={4}
            value={formData.descripcion}
            onChange={(e) => { setFormData({ ...formData, descripcion: e.target.value }); setBuscado(false); }}
            className="field resize-y"
            placeholder="Ej: Botella metálica verde con una calcomanía de la universidad"
          />
        </Field>

        {/* Búsqueda de coincidencias con IA */}
        <div className="rounded-xl border border-brand-light/25 bg-brand-light/[.06] p-4">
          <button type="button" onClick={handleBuscarIA} disabled={buscandoIA} className="btn btn-ghost w-full border-brand-light/30">
            {buscandoIA ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} className="text-brand-light" />}
            {buscandoIA ? 'Buscando coincidencias…' : 'Buscar coincidencias en el catálogo con IA'}
          </button>

          {buscado && sugerencias.length === 0 && (
            <p className="mt-3 text-center text-sm text-ink-soft">
              No encontramos objetos parecidos todavía. Envía el reporte y te avisaremos si llega algo.
            </p>
          )}

          {sugerencias.length > 0 && (
            <div className="mt-4">
              <p className="mb-2 text-sm font-semibold text-ink">
                {sugerencias.length === 1 ? 'Este objeto podría ser el tuyo' : `Estos ${sugerencias.length} objetos podrían ser el tuyo`}
              </p>
              <ul className="space-y-2">
                {sugerencias.map((obj) => (
                  <li key={obj.id}>
                    <Link to={`/app/objetos/${obj.id}`} className="tag-card block py-3 pl-11 pr-4">
                      <p className="text-xs tabular-nums text-ink-soft">{folio(obj.id)}</p>
                      <p className="font-semibold text-ink">{obj.titulo}</p>
                      <p className="mt-0.5 flex items-center gap-1 text-xs text-ink-soft"><MapPin size={12} /> {obj.ubicacion}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

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
