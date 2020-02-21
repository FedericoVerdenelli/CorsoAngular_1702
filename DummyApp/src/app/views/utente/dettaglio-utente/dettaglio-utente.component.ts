import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { ModalUtenteComponent } from 'src/app/views/utente/modal-utente/modal-utente.component';


export class UtenteForm {
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
  selector: 'app-dettaglio-utente',
  templateUrl: './dettaglio-utente.component.html',
  styleUrls: ['./dettaglio-utente.component.css']
})
export class DettaglioUtenteComponent implements OnInit {

  utenteForm: UtenteForm = new UtenteForm();
  mostraUtente = JSON.parse(sessionStorage.getItem('isLogged'));


  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    console.log(this.mostraUtente);
  }

  salvaForm() {

  }

  apri() {
    this.modalService.open(DettaglioUtenteComponent);
  }
}
