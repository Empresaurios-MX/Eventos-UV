import { Component, OnInit } from '@angular/core';
import { Evento } from 'src/app/models/evento';
import { EventoDataService } from '../../services/evento.data.service';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-events-confirmed',
  templateUrl: './events-confirmed.component.html',
  styleUrls: ['./events-confirmed.component.css']
})
export class EventsConfirmedComponent implements OnInit {

  evento: Evento;
  eventos: any;
  usuario: Usuario;
  smartphone: boolean;
  escritorio: boolean;

  constructor(private eventService: EventoDataService) {
    this.eventos = [];
    var usuarioGuardado = localStorage.getItem('usuario');
    this.usuario = JSON.parse(usuarioGuardado);
    this.eventos = this.usuario.eventos;
  }

  ngOnInit(): void {
  }

  etectarResolucion(){
    if(screen.width < 480){
      this.smartphone = true;
    } else {
      this.escritorio = true;
    }
  }

}
