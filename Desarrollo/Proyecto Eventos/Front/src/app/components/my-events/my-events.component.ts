import { Component, OnInit } from '@angular/core';
import { EventoDataService } from "../../services/evento.data.service";

@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.component.html',
  styleUrls: ['./my-events.component.css']
})
export class MyEventsComponent implements OnInit {

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

  deleteEventos(){
    this.eventService.delete();
  }
}



