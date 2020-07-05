import {Usuario} from './usuario';

export class Evento {
  id: number;
  nombre: string;
  descripcion: string;
  invitados: string;
  participantes: Array<Usuario>;
  fecha: string;
  hora: string;
  tags: Array<string>;
  foto: string;
  realizado: boolean;
}
