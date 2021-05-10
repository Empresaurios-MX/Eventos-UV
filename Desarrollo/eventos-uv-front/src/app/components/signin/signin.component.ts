import { Component, OnInit } from '@angular/core';
import { Login } from '../../models/login';
import { UsuarioDataService } from '../../services/usuario.data.service';
import { Usuario } from '../../models/usuario';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  login: Login;
  usuario: Usuario;
  smartphone: boolean;
  escritorio: boolean;

  constructor(private service: UsuarioDataService, private router: Router) {
  }

  ngOnInit(): void {
    this.detectarResolucion();
    this.login = new Login();
  }

  signIn() {
    if (this.login.rol === 'estudiante') {
      this.service.login(this.login).subscribe(response => {
        NavbarComponent.updateUserStatus.next(true); 
        this.usuario = response;
        let rol;
        if(response.rol == 'estudiante'){
          rol = 'estudiante';
        } else {
          rol = 'admin'
        }
        if(response.rol!=this.login.rol){
          Swal.fire('Ese no es tu rol','No seas mañoso','warning');
        }
        localStorage.setItem(rol, JSON.stringify(this.usuario));
        this.router.navigate(['/eventos']);
      });
      
    } else if (this.login.rol === 'administrador') {
      this.service.login(this.login).subscribe(response => {
        NavbarComponent.updateAdminStatus.next(true);  
        this.usuario = response;
        let rol;
        if(response.rol == 'administrador'){
          rol = 'admin';
        } else {
          rol = 'estudiante'
        }
        if(response.rol!=this.login.rol){
          Swal.fire('Ese no es tu rol','No seas mañoso','warning');
        }
        localStorage.setItem(rol, JSON.stringify(this.usuario));
        this.router.navigate(['/miseventos']);
      });
    } else {
      Swal.fire('Inicio de sesión','Debe seleccionar un rol','warning');
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
