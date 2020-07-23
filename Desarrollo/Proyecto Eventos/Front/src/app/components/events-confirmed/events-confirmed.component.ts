import { Component, OnInit } from '@angular/core';
import { Evento } from 'src/app/models/evento';
import { UsuarioEvento } from 'src/app/models/usuario-evento';
import { UsuarioEventoDataDataService } from '../../services/usuario-evento.data.service';
import { UsuarioDataService } from '../../services/usuario.data.service';
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

  constructor(private router: Router, private usuarioEventoService: UsuarioEventoDataDataService, private usuarioService: UsuarioDataService) {
   
  }

  getEventos(){
    this.eventos = [];
    var usuarioGuardado = localStorage.getItem('estudiante');
    this.usuario = JSON.parse(usuarioGuardado);
    this.eventos = this.usuario.eventos;
  }

  ngOnInit(): void {
    this.detectarResolucion();
    this.eventos = [];
    var usuarioGuardado = localStorage.getItem('estudiante');
    this.usuario = JSON.parse(usuarioGuardado);
    this.eventos = this.usuario.eventos;
    if(this.eventos === null){
      Swal.fire('Error', 'No has confirmado tu asistencia a ningún evento', 'error');
      this.router.navigate(['/eventos']);
    } 
  }

  detectarResolucion(){
    if(screen.width < 480){
      this.smartphone = true;
    } else {
      this.escritorio = true;
    }
  }

  eliminarAsistencia(eventoID){
    let usuarioEvento = new UsuarioEvento();
    usuarioEvento.usuarioId = this.usuario.id;
    usuarioEvento.eventoId = eventoID;
    this.usuarioEventoService.delete(usuarioEvento);
    this.refrescarStorage();
    this.getEventos();
  }

  refrescarStorage(){
    var usuarioGuardado;
    usuarioGuardado = localStorage.getItem('estudiante');
    this.usuario = JSON.parse(usuarioGuardado);
    this.usuarioService.findOne(this.usuario.id).subscribe(response => {
      this.usuario = response;
      localStorage.setItem('estudiante', JSON.stringify(this.usuario));
    });
  }

}
