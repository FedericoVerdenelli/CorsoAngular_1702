import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

export class SignUpForm {
  nome: string;
  cognome: string;
  login: string;
  email: string;
  password: string;

  constructor(nome= '', cognome = '', login = '', email= '', password= '') {
    this.nome = nome;
    this.cognome = cognome;
    this.login = login;
    this.email = email;
    this.password = password;
  }
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  myForm: SignUpForm = new SignUpForm();
  myInput;
  constructor(private authServ: AuthService) {}

  ngOnInit() {}

  onSubmit(e) {
    this.authServ.getRegistered(this.myForm);
  }

}

// ngOnInit(): void {
//   this.heroForm = new FormGroup({
//     'name': new FormControl(this.hero.name, [
//       Validators.required,
//       Validators.minLength(4),
//       forbiddenNameValidator(/bob/i) // <-- Here's how you pass in the custom validator.
//     ]),
//     'alterEgo': new FormControl(this.hero.alterEgo),
//     'power': new FormControl(this.hero.power, Validators.required)
//   });

// }
