import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

export class SignUpForm {
  nome: string;
  cognome: string;
  login: string;
  email: string;
  password: string;
  confirmPassword: string;

  constructor(
    nome = '',
    cognome = '',
    login = '',
    email = '',
    password = '',
    confirmPassword = ''
  ) {
    this.nome = nome;
    this.cognome = cognome;
    this.login = login;
    this.email = email;
    this.password = password;
    this.confirmPassword = confirmPassword;
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
  signUpForm;
  errore = true;
  constructor(private authServ: AuthService) {}

  ngOnInit() {
    this.signUpForm = new FormGroup({
      nome: new FormControl(this.myForm.nome, Validators.required),
      cognome: new FormControl(this.myForm.cognome, Validators.required),
      login: new FormControl(this.myForm.login, Validators.required),
      // tslint:disable-next-line: max-line-length
      email: new FormControl(this.myForm.login, [
        Validators.required,
        Validators.pattern('^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$')

      ]),
      password: new FormControl(this.myForm.password, [
        Validators.required,
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ]),
      confirmPassword: new FormControl(
        this.myForm.confirmPassword,
        Validators.required
      ),
    });
  }

  onSubmit(e) {
    if (this.errore) {
      this.authServ.signUp(this.myForm);
    }
  }

  controllaPsw(group: FormGroup) {
    console.log('zzzz', this.myForm.password);
    console.log('zzzz', this.myForm.confirmPassword);

    if (this.myForm.password !== this.myForm.confirmPassword) {
      this.errore = false;
    }
  }
}
