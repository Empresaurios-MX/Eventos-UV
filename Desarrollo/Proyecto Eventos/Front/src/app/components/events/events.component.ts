import {Component, OnInit} from '@angular/core';
import {EventoDataService} from '../../services/evento.data.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  eventos: any;

  constructor(private eventService: EventoDataService) {
    this.eventos = [];
  }

  ngOnInit() {
    this.getEventos();
  }

  getEventos() {
    this.eventService.findAll().subscribe(value => {
      console.log(value);
      this.eventos = value;
    });
  }
}

