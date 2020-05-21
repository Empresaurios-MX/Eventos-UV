import { Component, OnInit } from '@angular/core';
import { EventoDataService } from "../../services/eventos.data.service";

@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.component.html',
  styleUrls: ['./my-events.component.css']
})
export class MyEventsComponent implements OnInit {

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


