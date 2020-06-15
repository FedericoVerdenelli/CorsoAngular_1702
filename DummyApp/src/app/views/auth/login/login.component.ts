import { AuthService } from './../../../services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, NavigationStart } from '@angular/router';

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
export class LoginComponent implements OnInit, OnDestroy { // , OnDestroy
  subscription: Subscription;
  myForm: Login = new Login();
  booleanaErr = true;
  hoCliccato = false;
  booUserAuth = true;
  spinner = false;
  routerSubscription: Subscription;
  constructor(private authService: AuthService, private router: Router) {
    this.routerSubscription = router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        const browserRefresh = !router.navigated;
      }
    });
   }

  onSubmit(e) {
    console.log(this.myForm);
  }

  ngOnInit() {
    this.subscription = this.authService
    .getUserAuth()
    .subscribe(userAuth => {
      console.log('proprieta di userAuth: ' + userAuth.autenticato);
      this.booUserAuth = userAuth.autenticato;
    });
  }

  autentication() {
    this.spinner = true;
    this.authService.login(this.myForm.user, this.myForm.password);
    this.hoCliccato = true;
    if (this.booUserAuth && this.hoCliccato) {
      this.booleanaErr = true;
      console.log('Condizione di non mostra di errore ' + this.booleanaErr + 'valore di user autenticato ' + this.booUserAuth);
    } else {
      this.booleanaErr = false;
      console.log('Condizione di mostra paragrafo' + this.booleanaErr + ' user autenticato else della if  ' + this.booUserAuth);
      this.spinner = false;
    }
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.routerSubscription.unsubscribe();

  }
}
