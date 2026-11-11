export interface Objeto {
  id: number;
  titulo: string;
  descripcion: string;
  categoria: string;
  fechaHallazgo: string;
  ubicacion: string;
  estado: string;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
}