import {Component, OnInit} from '@angular/core';
import {Login} from '../../models/login';
import {UsuarioDataService} from '../../services/usuario.data.service';
import {Usuario} from '../../models/usuario';
import {Router} from '@angular/router';

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
        this.usuario = response;
        this.router.navigate(['/eventos']);
      });
      console.log('Logeado como estudiante');
    } else if (this.login.rol === 'administrador') {
      this.service.login(this.login).subscribe(response => {
        this.usuario = response;
        this.router.navigate(['/miseventos']);
      });
      console.log('Logeado como administrador');
    } else {
      window.alert('Debe selecionar un rol');
    }
  }


}
