import { Component, OnInit } from '@angular/core';
import { CrudService } from './../../services/crud.service';
import { UtenteForm } from './../utente/dettaglio-utente/dettaglio-utente.component';
import { Libro } from './../catalogo/catalogo-libri/catalogo-libri.component';

export class LibroBean {

}

export class UtenteBean{
  cognome: string;
  email: string;
  id: number;
  listaLibri: Libro[];
  nome: string;
  password: string;
  username: string;

  constructor(
    id?,
    nome = '',
    cognome = '',
    username = '',
    email = '',
    password = '',
    listaLibri = []
  ) {
    this.id = id;
    this.nome = nome;
    this.cognome = cognome;
    this.username = username;
    this.email = email;
    this.password = password;
    this.listaLibri = listaLibri;
  }
}

@Component({
  selector: 'app-preferiti',
  templateUrl: './preferiti.component.html',
  styleUrls: ['./preferiti.component.css']
})
export class PreferitiComponent implements OnInit {

  mostraUtente = JSON.parse(sessionStorage.getItem('isLogged'));
  listaUtenti:UtenteBean[];
  listalibri;
  constructor(private crud:CrudService) { }

  ngOnInit() {
    this.crud.getUtenteById(this.mostraUtente.id)
    .subscribe(
      utente =>{
        this.listaUtenti = utente;
        this.listalibri = this.listaUtenti[0].listaLibri;
        // alert(JSON.stringify(this.listaUtenti[0].listaLibri));
      });
  }
  mostra(libro) {
    libro.aperto = !libro.aperto;
  }
}
