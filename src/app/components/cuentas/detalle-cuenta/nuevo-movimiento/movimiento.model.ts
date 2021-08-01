export interface Movements {
  id: number;
  fecha: string;
  nombre: string;
  id_tipo_mov: number;
  monto: number;
  id_categoria?: number;
  id_cuenta?: number;
  categoria: { nombre: string };
  tipo_movimiento: { nombre: string };
}
