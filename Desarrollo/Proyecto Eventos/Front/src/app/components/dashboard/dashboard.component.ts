import { Component, OnInit } from '@angular/core';
import { EstadisticasDataService } from '../../services/estadisticas.data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  numEventos: any;
  numUsuarios: any;
  eventoPop: string;
  partEventoPopular: number;

  constructor(private service: EstadisticasDataService) { }

  ngOnInit(): void {
    this.contarUsuarios();
    this.contarEventos();
    this.eventoPopular();
  }

  contarEventos(){
    this.service.contarEventos().subscribe(value => {
      this.numEventos = value.resultado;
    });
  }

  contarUsuarios(){
    this.service.contarUsuarios().subscribe(value => {
      this.numUsuarios = value.resultado;
    });
  }

  eventoPopular(){
    this.service.eventoPopular().subscribe(value => {
      this.eventoPop = value.nombre;
      this.partEventoPopular = value.participantes;
    });
  }
}
