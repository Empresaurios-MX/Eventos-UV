import { Component, OnInit, ViewChild } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { UsuarioDataService } from '../../services/usuario.data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;
  saludo: string;
  imagenSaludo: string;
  newPassword: string;

  constructor(private usuarioService: UsuarioDataService, private modalService: NgbModal, private router: Router) { }


  ngOnInit(): void {
    this.mostrarSaludo();
    var usuarioGuardado;
    if (sessionStorage.getItem('admin')) {
      usuarioGuardado = sessionStorage.getItem('admin');
    } else if (sessionStorage.getItem('estudiante')) {
      usuarioGuardado = sessionStorage.getItem('estudiante');
    }
    this.usuario = JSON.parse(usuarioGuardado);
  }

  mostrarSaludo() {
    var fecha = new Date();
    var hora = fecha.getHours();
    if (hora >= 0 && hora <12) {
      this.saludo = 'Buenos días';
      this.imagenSaludo = '../../../assets/images/buenosDias.png';
    } else if (hora >= 12 && hora < 19) {
      this.saludo = 'Buenas tardes';
      this.imagenSaludo = '../../../assets/images/buenasTardes.png';
    } else {
      this.saludo = 'Buenas noches';
      this.imagenSaludo = '../../../assets/images/buenasNoches.png';
    }
  }

  mostrarModal(modal){
    this.modalService.open(modal, { size: 'lg', centered: true});
  }

  cerrarSesion(){
    Swal.fire('Cerrar sesión', 'La sesión se ha cerrado correctamente', 'success');
    this.router.navigate(['/signin']);
    sessionStorage.removeItem('estudiante');
    NavbarComponent.updateUserStatus.next(true); // Componer
  }

}
