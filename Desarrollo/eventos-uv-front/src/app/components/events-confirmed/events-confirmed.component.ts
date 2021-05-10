import { Component, OnInit } from '@angular/core';
import { Evento } from 'src/app/models/evento';
import { UsuarioEvento } from 'src/app/models/usuario-evento';
import { UsuarioEventoDataDataService } from '../../services/usuario-evento.data.service';
import { UsuarioDataService } from '../../services/usuario.data.service';
import { Usuario } from '../../models/usuario';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
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

  constructor(private toastr: ToastrService, private router: Router, private usuarioEventoService: UsuarioEventoDataDataService, private usuarioService: UsuarioDataService) {

  }

  getEventos() {
    this.eventos = [];
    var usuarioGuardado = localStorage.getItem('estudiante');
    this.usuario = JSON.parse(usuarioGuardado);
    this.eventos = this.usuario.eventos;
    if (this.eventos === null) {
      Swal.fire('Error', 'No has confirmado tu asistencia a ningún evento', 'error');
      this.router.navigate(['/eventos']);
    }
  }

  ngOnInit(): void {
    this.refrescarStorage();
    this.detectarResolucion();
    this.getEventos();
  }

  detectarResolucion() {
    if (screen.width < 480) {
      this.smartphone = true;
    } else {
      this.escritorio = true;
    }
  }

  notificacionExitosaNoAsistir() {
    this.toastr.error("Su asistencia fue desconfirmada para el evento");
  }

  eliminarAsistencia(eventoID) {
    let usuarioEvento = new UsuarioEvento();
    usuarioEvento.usuarioId = this.usuario.id;
    usuarioEvento.eventoId = eventoID;
    this.usuarioEventoService.delete(usuarioEvento).then(res => {
      if (res) {
        this.notificacionExitosaNoAsistir();
        this.refrescarStorage();
        this.getEventos();
      }
    });

  }

  refrescarStorage() {
    var usuarioGuardado;
    usuarioGuardado = localStorage.getItem('estudiante');
    this.usuario = JSON.parse(usuarioGuardado);
    this.usuarioService.findOne(this.usuario.id).subscribe(response => {
      console.log(response);
      localStorage.setItem('estudiante', JSON.stringify(response));
    });
  }

}
