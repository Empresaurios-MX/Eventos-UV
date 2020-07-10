import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {

  visibleAnonimo: boolean;
  visibleEstudiante: boolean;
  visibleAdmin: boolean;
  visiblePerfil: boolean;

  constructor() {
  }

  ngOnInit(): void {
    this.opcionesMenu();
  }

  public isMenuCollapsed = true;

  opcionesMenu() {
    if (localStorage.getItem('estudiante')) {
      this.visibleEstudiante = true;
      this.visiblePerfil = true;
    } else if (localStorage.getItem('admin')) {
      this.visibleAdmin = true;
      this.visiblePerfil = true;
    } else {
      this.visibleAnonimo = true;
    }
  }
}
