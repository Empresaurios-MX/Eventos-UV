import { Component, OnInit } from '@angular/core';
import { EventoDataService } from "../../services/eventos.data.service";

@Component({
  selector: 'app-tasks',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  eventos = [];

  constructor(private eventService: EventoDataService) { }

  ngOnInit() {
    this.eventService.getEventos()
      .subscribe(
        res => {
          console.log(res)
          this.eventos = res;
        },
        err => console.log(err)
      )
  }

}

