import { AuthService } from './../../../services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

class Login {
  user: string;
  password: string;

  constructor(user= '', password= '') {
    this.user = user;
    this.password = password;
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit { //, OnDestroy
  subscription: Subscription;
  myForm: Login = new Login();
  booleanaErr = true;
  hoCliccato = false;
  constructor(private authService: AuthService) {
   }

  onSubmit(e) {
    console.log(this.myForm);
  }

  ngOnInit() {
  }

  autentication() {

    this.authService.login(this.myForm.user, this.myForm.password);
    this.hoCliccato = true;
    this.subscription = this.authService
      .getUserAuth()
      .subscribe(userAuth => {
        console.log('proprieta di userAuth: '+ userAuth.autenticato);
        if (userAuth.autenticato && this.hoCliccato) {
          this.booleanaErr = true;
          console.log('Condizione di non mostra di errore ' + this.booleanaErr + 'valore di user autenticato ' + userAuth.autenticato);
        } else {
          this.booleanaErr = false;
          console.log('Condizione di mostra paragrafo' + this.booleanaErr + ' user autenticato else della if  ' + userAuth.autenticato);
        }
      });

  }
  // ngOnDestroy() {
  //   this.subscription.unsubscribe();

  // }
}
