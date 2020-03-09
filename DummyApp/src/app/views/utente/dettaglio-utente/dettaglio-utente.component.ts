import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';

export class UtenteForm {
  id: number;
  nome: string;
  cognome: string;
  login: string;
  email: string;
  password: string;
  confirmPassword: string;

  constructor(
    id?,
    nome = '',
    cognome = '',
    login = '',
    email = '',
    password = '',
    confirmPassword = ''
  ) {
    this.id = id;
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

  mostraUtente = JSON.parse(sessionStorage.getItem('isLogged'));
  modal: UtenteForm = new UtenteForm();
  errorePassword;

  constructor(private modalService: NgbModal, private crud: CrudService) { }

  ngOnInit() {
    console.log(this.mostraUtente);
  }

  openPassword(password) {
    this.modalService.open(password);
  }

  openCognome(cognome) {
    this.modalService.open(cognome);
  }

  openNome(nome) {
    this.modalService.open(nome);
  }

  salva() {
    console.log(this.mostraUtente.nome);
    this.crud.updateName(this.mostraUtente);
    this.mostraUtente = sessionStorage.setItem('isLogged', JSON.stringify(this.mostraUtente));
    window.location.reload();
    this.modalService.dismissAll();
  }

  salvaPassword() {
    this.errorePassword = false;
    if (this.mostraUtente.password === this.mostraUtente.confirmPassword) {
      this.crud.updateName(this.mostraUtente);
      console.log('DettaglioUtenteComponent -> salvaPassword -> this.mostraUtente', this.mostraUtente);
      this.modalService.dismissAll();
    } else {
      this.errorePassword = true;
    }

  }
}
