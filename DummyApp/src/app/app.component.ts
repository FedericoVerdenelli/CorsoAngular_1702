import { AuthService } from './services/auth.service';
import { Component, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  subscription: Subscription;
  title = 'DummyApp';
  autorizzato = false;
  constructor(private servizioAcc: AuthService) {
    this.subscription = this.servizioAcc.getBoolean().subscribe(autorizzazione => {
      this.autorizzato = autorizzazione;
    });

  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
}

}


