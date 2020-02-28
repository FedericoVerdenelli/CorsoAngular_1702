import { AuthService } from './../../../services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

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
export class SignupComponent implements OnInit, OnDestroy {
  myForm: SignUpForm = new SignUpForm();
  myInput;
  signUpForm;
  errore = true;
  sessionEmpty;

  subscription: Subscription;
  booleanaErr = true;
  hoCliccato = false;

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


  }

  registration() {
    if (this.errore) {
      this.authServ.signUp(this.myForm);
      this.hoCliccato = true;
      this.subscription = this.authServ
      .getUserAuth()
      .subscribe(userAuth => {
        if (userAuth.autenticato && this.hoCliccato) {
          this.booleanaErr = true;
        } else {
          this.booleanaErr = false;
        }
      });
      // if ( this.authServ.isEmpty(sessionStorage.getItem('isLogged'))) {
      //   this.sessionEmpty = true;
      // } else {
      //   this.sessionEmpty = false;
      // }
      // if (this.sessionEmpty && this.hoCliccato) {
      //   this.booleanaErr = true;
      // } else {
      //   this.booleanaErr = false;
      // }
    }

  }

  controllaPsw(group: FormGroup) {
    console.log('zzzz', this.myForm.password);
    console.log('zzzz', this.myForm.confirmPassword);

    if (this.myForm.password !== this.myForm.confirmPassword) {
      this.errore = false;
    }
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();

  }
}
