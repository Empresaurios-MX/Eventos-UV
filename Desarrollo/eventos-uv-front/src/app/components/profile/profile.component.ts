import { Component, OnInit } from '@angular/core';
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

  actualizarDatos(){
    this.usuario.password = '';
    this.usuarioService.update(this.usuario.id, this.usuario).subscribe(res => {
      if(res){
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
    NavbarComponent.updateUserStatus.next(true); // Componer, falta es subscribe
  }

  //Metodo para obtener los tags
  getTags(): string[] {
    const intereses = [];

    if (this.arte) {
      intereses.push('Arte');
    }
    if (this.musica) {
      intereses.push('Musica');
    }
    if (this.ciencia) {
      intereses.push('Ciencia');
    }
    if (this.baile) {
      intereses.push('Baile');
    }
    if (this.medicina) {
      intereses.push('Medicina');
    }
    if (this.cultura) {
      intereses.push('Cultura');
    }
    if (this.recreacion) {
      intereses.push('Recreacion');
    }
    if (this.literatura) {
      intereses.push('Literatura');
    }
    if (this.especial) {
      intereses.push('Especial');
    }
    return intereses;
  }

  check(interes: string, check: boolean) {
    switch (interes) {
      case 'arte':
        this.arte = check;
        break;
      case 'musica':
        this.musica = check;
        break;
      case 'ciencia':
        this.ciencia = check;
        break;
      case 'baile':
        this.baile = check;
        break;
      case 'medicina':
        this.medicina = check;
        break;
      case 'cultura':
        this.cultura = check;
        break;
      case 'recreacion':
        this.recreacion = check;
        break;
      case 'literatura':
        this.literatura = check;
        break;
      case 'especial':
        this.especial = check;
        break;
    }
  }

  detectarResolucion(){
    if(screen.width < 480){
      this.smartphone = true;
    } else {
      this.escritorio = true;
    }
  }


}
