import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private router: Router) { }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToLibreria() {
    this.router.navigate(['/libreria']);
  }
  goToHome() {
    this.router.navigate(['/home']);
  }
}


