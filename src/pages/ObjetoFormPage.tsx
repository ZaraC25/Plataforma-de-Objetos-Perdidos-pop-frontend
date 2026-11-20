import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCrearObjeto } from '../features/objetos/api/useCrearObjeto';
import { Loader2 } from 'lucide-react';
import { PageHeader, Field, CATEGORIAS, nowLocal } from '../components/ui';

export function ObjetoFormPage() {
  const navigate = useNavigate();
  const { mutateAsync: crearObjeto, isPending } = useCrearObjeto();

  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    categoria: 'ELECTRONICA',
    fechaHallazgo: nowLocal(),
    ubicacion: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await crearObjeto(formData);
    navigate('/app');
  };

  return (
    <div className="mx-auto max-w-2xl">
      <PageHeader
        title="Registrar objeto encontrado"
        description="Aparecerá en el catálogo para que su dueño pueda reclamarlo."
        backTo={{ to: '/app', label: 'Catálogo' }}
      />

      <form onSubmit={handleSubmit} className="panel space-y-5 p-6 sm:p-8">
        <Field label="Nombre del objeto" htmlFor="titulo">
          <input id="titulo" type="text" required value={formData.titulo}
            onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
            className="field" placeholder="Ej: MacBook Pro gris" />
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Categoría" htmlFor="categoria">
            <select id="categoria" value={formData.categoria}
              onChange={(e) => setFormData({ ...formData, categoria: e.target.value })} className="field">
              {CATEGORIAS.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
          </Field>
          <Field label="Fecha de hallazgo" htmlFor="fecha">
            <input id="fecha" type="datetime-local" required value={formData.fechaHallazgo}
              onChange={(e) => setFormData({ ...formData, fechaHallazgo: e.target.value })} className="field" />
          </Field>
        </div>

        <Field label="Dónde se encontró" htmlFor="ubicacion">
          <input id="ubicacion" type="text" required value={formData.ubicacion}
            onChange={(e) => setFormData({ ...formData, ubicacion: e.target.value })}
            className="field" placeholder="Ej: Bloque B, salón 204" />
        </Field>

        <Field label="Descripción pública" htmlFor="descripcion"
          hint="Evita detalles que solo el dueño conoce (marcas, contenido, contraseñas): sirven para verificar la reclamación.">
          <textarea id="descripcion" required rows={4} value={formData.descripcion}
            onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
            className="field resize-y" placeholder="Color, tamaño y rasgos generales…" />
        </Field>

        <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
          <button type="button" onClick={() => navigate('/app')} className="btn btn-ghost">Cancelar</button>
          <button type="submit" disabled={isPending} className="btn btn-primary">
            {isPending && <Loader2 size={16} className="animate-spin" />}
            {isPending ? 'Registrando…' : 'Registrar objeto'}
          </button>
        </div>
      </form>
    </div>
  );
}
