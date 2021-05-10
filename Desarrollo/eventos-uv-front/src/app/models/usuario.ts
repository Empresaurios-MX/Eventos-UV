import {Evento} from './evento';

export class Usuario {
  id: number;
  password: string;
  nombre: string;
  apellidos: string;
  intereses: Array<string>;
  eventos: Array<Evento>;
  email: string;
  rol: string;
}
