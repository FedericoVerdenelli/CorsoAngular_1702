import { Component, OnInit } from '@angular/core';

export class UtenteForm {
  nome: string;
  cognome: string;
  login: string;
  email: string;
  password: string;
  confirmPassword: string;
}


@Component({
  selector: 'app-dettaglio-utente',
  templateUrl: './dettaglio-utente.component.html',
  styleUrls: ['./dettaglio-utente.component.css']
})
export class DettaglioUtenteComponent implements OnInit {

  utenteForm;

  constructor() { }

  ngOnInit() {
  }

  salvaForm(){

  }

}
