import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NonNullAssert } from '@angular/compiler';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(private authService: AuthService) {
   }

  ngOnInit() {
  }

  autentication() {
    this.authService.getAccess('GGargani', 'gianluca');
  }

}
