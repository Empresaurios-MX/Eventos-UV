import { Component, OnInit, Injectable } from '@angular/core';
import { Evento } from '../../models/evento';
import { Notification } from '../../models/notification'
import { EventoDataService } from '../../services/evento.data.service';
import { NgbModal, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgbCalendar, NgbDateAdapter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgbTimeStruct, NgbTimeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { NotificationsService } from '../../services/notifications.service';
import { DatePickerService } from '../../services/date.picker.service';
import { DateFormatterService } from '../../services/date.formatter.service';
import { TimeAdapterService } from '../../services/time.adapter.service';
import Swal from 'sweetalert2';


//Mis eventos
@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.component.html',
  providers: [
    { provide: NgbDateAdapter, useClass: DatePickerService },
    { provide: NgbDateParserFormatter, useClass: DateFormatterService },
    { provide: NgbTimeAdapter, useClass: TimeAdapterService }
  ],
  styleUrls: ['./my-events.component.css']
})


export class MyEventsComponent implements OnInit {


  //Modelo para el calendario y el reloj
  model: NgbDateStruct;

  //Eventos
  eventos: any;
  evento: Evento;

  //Tags
  arte: boolean;
  musica: boolean;
  ciencia: boolean;
  baile: boolean;
  medicina: boolean;
  cultura: boolean;
  recreacion: boolean;
  literatura: boolean;
  especial: boolean;

  //Resolucion
  smartphone: boolean;
  escritorio: boolean;

  constructor(private ngbCalendar: NgbCalendar,
    private dateAdapter: NgbDateAdapter<string>,
    private eventService: EventoDataService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private storage: AngularFireStorage,
    private notificationService: NotificationsService) {

    this.eventos = [];

  }

  ngOnInit() {
    this.getEventos();
    this.falseTags();
    this.detectarResolucion();
  }

  //Firebase
  uploadProgress: Observable<number>;
  uploadURL: Observable<string>;
  progresoFinalizado: boolean;
  porcentajeSubida: number;
  message;


  //Metodos firebase para subir la imagen
  upload(event) {
    //Obtener el archivo mandado
    const file = event.target.files[0];

    //Generar un ID
    const randomID = Math.random().toString(36).substring(2);
    const filePath = `images/${randomID}`;
    const fileRef = this.storage.ref(filePath);

    //Subir imagen
    const task = this.storage.upload(filePath, file);

    //Cambia el porcentaje
    task.percentageChanges().subscribe((uploadProgress) => {
      this.porcentajeSubida = Math.round(uploadProgress);
      if (this.porcentajeSubida == 100) {
        this.progresoFinalizado = true;
      }
    });

    //Obtener URl
    task.snapshotChanges()
      .pipe(
        finalize(() =>
          fileRef.getDownloadURL().subscribe(urlImage => {
            this.evento.foto = urlImage;
          })
        )
      ).subscribe();
  }

  //Metodo para la fecha
  get today() {
    return this.dateAdapter.toModel(this.ngbCalendar.getToday())!;
  }

  //Metodos para las notificaciones Toast
  notificacionExitosaCrear() {
    this.toastr.success("Evento agregado exitosamente");
  }

  notificacionExitosaEditar() {
    this.toastr.success("Evento actualizado exitosamente");
  }

  //Metodos de los modales
  mostrarModal(modal) {
    this.evento = new Evento();
    this.falseTags();
    this.modalService.open(modal, { size: 'lg' });
  }

  mostrarModalEditar(modal) {
    this.getTags();
    this.modalService.open(modal, { size: 'lg' });
  }

  cerrarModal() {
    this.modalService.dismissAll(true);
  }

  //Metodos CRUD del evento
  createEvento() {
    this.evento.tags = this.getTags();
    this.evento.realizado = false;
    this.eventService.create(this.evento).subscribe(res => {
      if (res) {
        this.notificacionExitosaCrear();
        this.modalService.dismissAll(true);

        //Notificacion de evento
        let notificacion = new Notification();
        notificacion.title = this.evento.nombre;
        notificacion.body = '¡Un nuevo evento ha aparecido!';
        notificacion.icon = this.evento.foto;
        notificacion.link = 'https://eventos-uv-dev.web.app/';
        this.notificationService.sendNotification(notificacion);

        this.getEventos();
      }
    })
  }

  updateEvento() {
    this.eventService.update(this.evento.id, this.evento).subscribe(res => {
      if (res) {
        this.notificacionExitosaEditar();
        this.modalService.dismissAll(true);
        this.getEventos();
      }
    });

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

  deleteEvento(id) {
    Swal.fire({
      title: '¿Seguro que desea eliminar el evento?',
      text: "¡No podra deshacer esta acción!",
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Si, eliminarlo'
    }).then((res) => {
      if (res.value) {
        this.eventService.delete(id).subscribe(res => {
          Swal.fire(
            'Eliminado',
            'El evento ha sido eliminado exitosamente',
            'success'
          )
          this.getEventos();
        })
      }
    })
  }

  //Metodo para poner en false los tags
  falseTags() {
    this.arte = false;
    this.musica = false;
    this.ciencia = false;
    this.baile = false;
    this.medicina = false;
    this.cultura = false;
    this.recreacion = false;
    this.literatura = false;
    this.especial = false;
  }

  //Metodo para obtener los tags
  getTags(): string[] {
    const intereses = [];

    if (this.arte) {
      intereses.push('Arte');
    }
    if (this.musica) {
      intereses.push('Musica');
    }
    if (this.ciencia) {
      intereses.push('Ciencia');
    }
    if (this.baile) {
      intereses.push('Baile');
    }
    if (this.medicina) {
      intereses.push('Medicina');
    }
    if (this.cultura) {
      intereses.push('Cultura');
    }
    if (this.recreacion) {
      intereses.push('Recreacion');
    }
    if (this.literatura) {
      intereses.push('Literatura');
    }
    if (this.especial) {
      intereses.push('Especial');
    }
    return intereses;
  }

  check(interes: string, check: boolean) {
    switch (interes) {
      case 'arte':
        this.arte = check;
        break;
      case 'musica':
        this.musica = check;
        break;
      case 'ciencia':
        this.ciencia = check;
        break;
      case 'baile':
        this.baile = check;
        break;
      case 'medicina':
        this.medicina = check;
        break;
      case 'cultura':
        this.cultura = check;
        break;
      case 'recreacion':
        this.recreacion = check;
        break;
      case 'literatura':
        this.literatura = check;
        break;
      case 'especial':
        this.especial = check;
        break;
    }
  }

  detectarResolucion() {
    if (screen.width < 480) {
      this.smartphone = true;
    } else {
      this.escritorio = true;
    }
  }
}



