import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs'

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

    NavbarComponent.updateAdminStatus.subscribe(res => {
      this.visibleAdmin = true;
      this.visiblePerfil = true;
      this.visibleAnonimo = false;
     });

     NavbarComponent.updateUserStatus.subscribe(res => {
      this.visibleEstudiante = true;
      this.visiblePerfil = true;
      this.visibleAnonimo = false;
     });
  }

  ngOnInit(): void {
    this.opcionesMenu();
  }

  public isMenuCollapsed = true;
  public static updateUserStatus: Subject<boolean> = new Subject(); 
  public static updateAdminStatus: Subject<boolean> = new Subject();

  opcionesMenu() {
    if (sessionStorage.getItem('estudiante')) {
      this.visibleEstudiante = true;
      this.visiblePerfil = true;
    } else if (sessionStorage.getItem('admin')) {
      this.visibleAdmin = true;
      this.visiblePerfil = true;
    } else {
      this.visibleAnonimo = true;
    }
  }

  
}
