import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user = {
    username: '',
    email: '',
    password: '',
    labels: ''
  }

  constructor() { }

  ngOnInit(): void {
  }

  signUp(){
    console.log(this.user)
  }
}
