import {Component, OnInit} from '@angular/core';
import {Login} from '../../models/login';
import {UsuarioDataService} from '../../services/usuario.data.service';
import {Usuario} from '../../models/usuario';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  login: Login;
  usuario: Usuario;

  constructor(private service: UsuarioDataService) {
  }

  ngOnInit(): void {
    this.login = new Login();
  }

  signIn() {
    if (this.login.rol === 'estudiante' || this.login.rol === 'administrador') {
      this.service.login(this.login).subscribe(response => {
        this.usuario = response;
      });
    } else {
      window.alert('Debe selecionar un rol');
    }
  }

}
