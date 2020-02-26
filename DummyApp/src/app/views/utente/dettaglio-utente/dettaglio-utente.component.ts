import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

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

export class PasswordModal {
  confirmPassword: string;
  password: string;

  constructor(
    confirmPassword='',
    password=''
  ){
    this.confirmPassword=confirmPassword;
    this.password=password;
  }
}

@Component({
  selector: 'app-dettaglio-utente',
  templateUrl: './dettaglio-utente.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./dettaglio-utente.component.css']
})
export class DettaglioUtenteComponent implements OnInit {

  mostraUtente = JSON.parse(sessionStorage.getItem('isLogged'));
  modalProva: PasswordModal = new PasswordModal();

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    console.log(this.mostraUtente);
  }

  openPassword(password){
    this.modalService.open(password);
  }

  openCognome(cognome){
    this.modalService.open(cognome);
  }

  openNome(nome){
    this.modalService.open(nome);
  }
  
  salvaPassword(){
    if (this.modalProva.confirmPassword === this.modalProva.password) {
      console.log('autenticazione riuscita');
    } else {
      console.log('autenticazione fallita');
    }
  }
}
