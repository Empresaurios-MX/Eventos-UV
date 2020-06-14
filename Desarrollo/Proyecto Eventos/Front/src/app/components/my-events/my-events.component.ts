import { Component, OnInit, Injectable } from '@angular/core';
import { Evento } from '../../models/evento'
import { EventoDataService } from '../../services/evento.data.service';
import { NgbModal, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import {NgbCalendar, NgbDateAdapter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {NgbTimeStruct, NgbTimeAdapter} from '@ng-bootstrap/ng-bootstrap';

//Servicio para recuperar la fecha usando el DatePicker
@Injectable()
export class CustomAdapter extends NgbDateAdapter<string> {

  readonly DELIMITER = '-';

  fromModel(value: string | null): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        day : parseInt(date[0], 10),
        month : parseInt(date[1], 10),
        year : parseInt(date[2], 10)
      };
    }
    return null;
  }

  toModel(date: NgbDateStruct | null): string | null {
    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : null;
  }
}

//Servicio para Parsear la fecha
@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {

  readonly DELIMITER = '/';

  parse(value: string): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        day : parseInt(date[0], 10),
        month : parseInt(date[1], 10),
        year : parseInt(date[2], 10)
      };
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : '';
  }
}

//Servicio para la hora
const pad = (i: number): string => i < 10 ? `0${i}` : `${i}`;
@Injectable()
export class NgbTimeStringAdapter extends NgbTimeAdapter<string> {

  fromModel(value: string| null): NgbTimeStruct | null {
    if (!value) {
      return null;
    }
    const split = value.split(':');
    return {
      hour: parseInt(split[0], 10),
      minute: parseInt(split[1], 10),
      second: parseInt(split[2], 10)
    };
  }

  toModel(time: NgbTimeStruct | null): string | null {
    return time != null ? `${pad(time.hour)}:${pad(time.minute)}` : null;
  }
}


//Mis eventos
@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.component.html',
  providers: [
    {provide: NgbDateAdapter, useClass: CustomAdapter},
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter},
    {provide: NgbTimeAdapter, useClass: NgbTimeStringAdapter}
  ],
  styleUrls: ['./my-events.component.css']
})


export class MyEventsComponent implements OnInit {
  

  //Modelo para el calendario y el reloj
  model: NgbDateStruct;
  date: string;
  hora: string;

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

  constructor(private ngbCalendar: NgbCalendar, private dateAdapter: NgbDateAdapter<string>, private eventService: EventoDataService, private modalService: NgbModal, private toastr: ToastrService) {
                
    this.eventos = [];

  }

  ngOnInit() {
    this.getEventos();  
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

  //Metodo para la fecha 
  get today() {
    return this.dateAdapter.toModel(this.ngbCalendar.getToday())!;
  }

  //Metodos para las notificaciones
  notificacionExitosaCrear(){
    this.toastr.success("Evento agregado exitosamente")
  }
  
  notificacionExitosaEditar(){
    this.toastr.success("Evento editado exitosamente")
  }

  notificacionExitosaEliminar(nombre){
    this.toastr.success("Evento " + nombre + " eliminado exitosamente")
  }

  //Metodos de los modales

  mostrarModal(modal){
    this.evento = new Evento();
    this.modalService.open(modal, { size: 'lg' });
  }

  mostrarModalEditar(modal){
    this.modalService.open(modal , { size: 'lg'});
  }

  //Metodos CRUD
  createEvento(){
    this.evento.hora = this.hora;
    this.evento.fecha = this.date;
    this.evento.tags = this.getTags();
    this.evento.realizado = false;
    this.eventService.create(this.evento).subscribe(res => {
      if(res){
        this.notificacionExitosaCrear();
        this.modalService.dismissAll(true);
        this.getEventos();
      }
    })
  }

  updateEvento(){
    this.eventService.update(this.evento.id, this.evento).subscribe(res => {
      if(res){
        this.notificacionExitosaEditar();
        this.modalService.dismissAll(true);
        this.getEventos();
      }
    });

  }

  getEvento(id){
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
    this.eventService.delete(id).subscribe(res => {
      if(res){      
        this.notificacionExitosaEliminar(this.evento.nombre);
        this.getEventos();
      }
    });
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
}



