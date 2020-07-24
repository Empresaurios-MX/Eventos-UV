import { Component, OnInit } from '@angular/core';
import { EventoDataService } from '../../services/evento.data.service';
import { UsuarioEventoDataDataService } from '../../services/usuario-evento.data.service';
import { UsuarioDataService } from '../../services/usuario.data.service';
import { Usuario } from '../../models/usuario';
import { UsuarioEvento } from '../../models/usuario-evento';
import { Evento } from 'src/app/models/evento';
import { ToastrService } from 'ngx-toastr';
import { NotificationsService } from '../../services/notifications.service';


@Component({
  selector: 'app-tasks',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  eventos: any;
  evento: Evento;
  usuario: Usuario;
  usuarioEvento : UsuarioEvento;
  smartphone: boolean;
  escritorio: boolean;

  message;

  constructor(private eventService: EventoDataService, private eventUsuarioService: UsuarioEventoDataDataService, private toastr: ToastrService, private usuarioService: UsuarioDataService,  private notificationService: NotificationsService) {
    this.eventos = [];
    this.usuarioEvento = new UsuarioEvento();
    var usuarioGuardado = localStorage.getItem('estudiante');
    this.usuario = JSON.parse(usuarioGuardado);
  }

  ngOnInit() {
    this.getEventos();
    this.detectarResolucion();
    this.enviarNotificacion();
  }

  //Metodo para recibir notificacion de Firebase
  enviarNotificacion() {
    const userId = 'user001';
    this.notificationService.requestPermission(userId);
    this.message = this.notificationService.currentMessage;
    this.notificationService.receiveMessage();
  }

  asistirEvento(id: number){
    this.usuarioEvento.usuarioId = this.usuario.id;
    this.usuarioEvento.eventoId = id;
    this.getEvento(id);
    this.eventUsuarioService.create(this.usuarioEvento).subscribe(res => {
      if (res) {
        this.notificacionExitosaAsistir();
        this.refrescarStorage();
      } 
    })
  }

  getEvento(id) {
    this.eventService.findOne(id).subscribe(res => {
      this.evento = res;
    });
  }

  getEventos() {
    this.eventService.findAll().subscribe(res => {
      this.eventos = res;
    });
  }

  notificacionExitosaAsistir() {
    this.toastr.success("Su asistencia fue confirmada para el evento");
  }

  detectarResolucion(){
    if(screen.width < 480){
      this.smartphone = true;
    } else {
      this.escritorio = true;
    }
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

