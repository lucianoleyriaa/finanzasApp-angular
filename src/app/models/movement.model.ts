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

export interface Movement {
    id: number,
    date: string,
    name: string,
    type: {
        id: number, name: string
    },
    category: {
        id: number,
        name: string
    },
    amount: number
}
