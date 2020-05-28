import { Component, OnInit } from '@angular/core';
import { Evento } from '../../models/evento'
import { EventoDataService } from '../../services/evento.data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.component.html',
  styleUrls: ['./my-events.component.css']
})
export class MyEventsComponent implements OnInit {

  eventos: any;
  evento: Evento;

  arte: boolean;
  musica: boolean;
  ciencia: boolean;
  baile: boolean;
  medicina: boolean;
  cultura: boolean;
  recreacion: boolean;
  literatura: boolean;
  especial: boolean;

  constructor(private eventService: EventoDataService, private modalService: NgbModal) {
    this.eventos = [];
  }

  mostrarModal(modal){
    this.evento = new Evento();
    this.modalService.open(modal);
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

  createEvento(){
    this.evento.tags = this.getTags();
    this.evento.realizado = false;
    this.eventService.create(this.evento).subscribe(res => {
      if(res){
        console.log('Evento creado');
      }
      console.log(res)
    })
  }

  getEventos() {
    this.eventService.findAll().subscribe(value => {
      this.eventos = value;
    });
  }

  deleteEvento(id) {
    this.eventService.delete(id);
  }

  
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



