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
  eventos: any;
  smartphone: boolean;
  escritorio:boolean;

  constructor(private service: EstadisticasDataService) { }

  ngOnInit(): void {
    this.detectarResolucion();
    this.eventos = [];
    this.getEventosDashboard();
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

  getEventosDashboard(){
    this.service.usuariosPorEvento().subscribe(value => {
      this.eventos = value;
    });
  }

  detectarResolucion(){
    if(screen.width < 480){
      this.smartphone = true;
    } else {
      this.escritorio = true;
    }
  }
}
