import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { UsuarioDataService } from '../../services/usuario.data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-profile-admin',
  templateUrl: './profile-admin.component.html',
  styleUrls: ['./profile-admin.component.css']
})
export class ProfileAdminComponent implements OnInit {

  usuario: Usuario;
  saludo: string;
  imagenSaludo: string;
  newPassword: string;
  confirmPassword: string;

  smartphone: boolean;
  escritorio: boolean;

  //Interes
  arte: boolean;
  musica: boolean;
  ciencia: boolean;
  baile: boolean;
  medicina: boolean;
  cultura: boolean;
  recreacion: boolean;
  literatura: boolean;
  especial: boolean;

  constructor(private usuarioService: UsuarioDataService, private modalService: NgbModal, private router: Router) { }


  ngOnInit(): void {
    this.detectarResolucion();
    this.mostrarSaludo();
    var usuarioGuardado;
    if (localStorage.getItem('admin')) {
      usuarioGuardado = localStorage.getItem('admin');
    } else if (localStorage.getItem('estudiante')) {
      usuarioGuardado = localStorage.getItem('estudiante');
    }
    this.usuario = JSON.parse(usuarioGuardado);
  }

  mostrarSaludo() {
    var fecha = new Date();
    var hora = fecha.getHours();
    if (hora >= 0 && hora < 12) {
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

  mostrarModalPassword(modal) {
    this.modalService.open(modal, { size: 'lg', centered: true });
  }

  cambiarPass(newPassword, confirmPasssword) {
    if (newPassword === confirmPasssword) {
      this.usuario.password = newPassword;
      this.usuarioService.update(this.usuario.id, this.usuario).subscribe(res => {
        if (res) {
          this.modalService.dismissAll(true);
          Swal.fire('Contraseña actualizada', 'La contraseña ha sido actualizada con exito', 'success');
        }
      });
    } else {
      Swal.fire('Contraseña no actualizada', 'Las contraseñas no coinciden, intentelo de nuevo', 'error');
    }

  }

  mostrarModalActualizar(modal) {
    this.modalService.open(modal, { size: 'lg' });
  }

  actualizarDatos() {
    this.usuarioService.update(this.usuario.id, this.usuario).subscribe(res => {
      if (res) {
        this.modalService.dismissAll(true);
        Swal.fire('Actualización de datos', 'Los nuevos datos han sido guardados correctamente', 'success');
      }
    });
  }

  cerrarSesion() {
    Swal.fire('Cerrar sesión', 'La sesión se ha cerrado correctamente', 'success');
    this.router.navigate(['/signin']);
    localStorage.removeItem('estudiante');
    localStorage.removeItem('admin');
  }


  detectarResolucion() {
    if (screen.width < 480) {
      this.smartphone = true;
    } else {
      this.escritorio = true;
    }
  }


}
