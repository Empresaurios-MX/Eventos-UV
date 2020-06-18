import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;

  constructor() { }

  ngOnInit(): void {
    var usuarioGuardado = localStorage.getItem('usuario');
    this.usuario = JSON.parse(usuarioGuardado);
    console.log(this.usuario);
  }

}
