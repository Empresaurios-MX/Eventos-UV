import {Component, OnInit} from '@angular/core';
import {Usuario} from '../../models/usuario';
import {UsuarioDataService} from '../../services/usuario.data.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  usuario: Usuario;

  arte: boolean;
  musica: boolean;
  ciencia: boolean;
  baile: boolean;
  medicina: boolean;
  cultura: boolean;
  recreacion: boolean;
  literatura: boolean;
  especial: boolean;

  constructor(private service: UsuarioDataService) {
  }

  ngOnInit(): void {
    this.usuario = new Usuario();
    this.usuario.rol = 'estudiante';
    this.usuario.intereses = [];

    this.arte = false;
    this.musica = false;
    this.ciencia = false;
    this.baile = false;
    this.medicina = false;
    this.cultura = false;
    this.recreacion = false;
    this.literatura = false;
    this.especial = false;
  }

  signUp() {
    this.usuario.intereses = this.getIntereses();

    this.service.register(this.usuario).subscribe(response => {
      if (response) {
        console.log('Registrado!');
      }
      console.log(response);
    });
  }

  getIntereses(): string[] {
    const intereses = [];

    if (this.arte) {
      intereses.push('ARTE');
    }
    if (this.musica) {
      intereses.push('MUSICA');
    }
    if (this.ciencia) {
      intereses.push('CIENCIA');
    }
    if (this.baile) {
      intereses.push('BAILE');
    }
    if (this.medicina) {
      intereses.push('MEDICINA');
    }
    if (this.cultura) {
      intereses.push('CULTURA');
    }
    if (this.recreacion) {
      intereses.push('RECREACION');
    }
    if (this.literatura) {
      intereses.push('LITERATURA');
    }
    if (this.especial) {
      intereses.push('ESPECIAL');
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
}