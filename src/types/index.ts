export interface Persona {
  codigo: number;
  nombre: string;
  apellidos: string;
  dni: string;
}

export interface Cliente extends Persona {
  razon_social?: string;
  ruc?: string;
}

export interface Ruta {
  codigo: number;
  origen: string;
  destino: string;
  costo_referencial: number;
}

export interface Bus {
  codigo: number;
  placa: string;
  fabricante: string;
  num_asientos: number;
  estado: string;
}

export interface Viaje {
  codigo: number;
  fecha_hora_salida: string;
  fecha_hora_llegada_estimada: string;
  estado: string;
  ruta: Ruta;
  bus: Bus;
  chofer: Personal;
  asientos_disponibles: number;
}

export interface Personal extends Persona {
  direccion: string;
  telefono: string;
  email: string;
  cargo: string;
  area: string;
}

export interface Pasaje {
  codigo: number;
  fecha_emision: string;
  asiento: number;
  importe_pagar: number;
  estado: string;
  viaje: Viaje;
  cliente: Cliente;
}

export interface Usuario {
  codigo: number;
  usuario: string;
  estado: string;
  personal: Personal;
  tipo_usuario: string;
}

export interface SearchFilters {
  origen: string;
  destino: string;
  fecha: string;
  pasajeros: number;
}