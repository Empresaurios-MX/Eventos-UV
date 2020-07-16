import { Component, OnInit } from '@angular/core';
import { Evento } from 'src/app/models/evento';
import { EventoDataService } from '../../services/evento.data.service';
import { Usuario } from '../../models/usuario';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

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

  constructor(private eventService: EventoDataService, private router: Router) {
    this.eventos = [];
    var usuarioGuardado = sessionStorage.getItem('estudiante');
    this.usuario = JSON.parse(usuarioGuardado);
    this.eventos = this.usuario.eventos;
    if(this.eventos === null){
      Swal.fire('Error', 'No has confirmado tu asistencia a ningún evento', 'error');
      this.router.navigate(['/eventos']);
    } 
  }

  ngOnInit(): void {
    this.detectarResolucion();
  }

  detectarResolucion(){
    if(screen.width < 480){
      this.smartphone = true;
    } else {
      this.escritorio = true;
    }
  }

}
