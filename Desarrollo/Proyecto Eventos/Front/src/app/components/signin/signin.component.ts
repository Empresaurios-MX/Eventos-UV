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

  constructor(private service: UsuarioDataService, private router: Router) {
  }

  ngOnInit(): void {
    this.login = new Login();
  }

  signIn() {
    if (this.login.rol === 'estudiante') {
      this.service.login(this.login).subscribe(response => {
        NavbarComponent.updateUserStatus.next(true); // here! 
        this.usuario = response;
        localStorage.setItem('estudiante', JSON.stringify(this.usuario));
        this.router.navigate(['/eventos']);
      });
      
    } else if (this.login.rol === 'administrador') {
      this.service.login(this.login).subscribe(response => {
        NavbarComponent.updateAdminStatus.next(true); // here! 
        this.usuario = response;
        localStorage.setItem('admin', JSON.stringify(this.usuario));
        this.router.navigate(['/miseventos']);
      });
    } else {
      Swal.fire('Inicio de sesión','Debe seleccionar un rol','warning');
    }
  }
}
