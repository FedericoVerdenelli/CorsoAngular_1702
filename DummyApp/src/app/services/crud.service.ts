import { UtenteForm } from './../views/utente/dettaglio-utente/dettaglio-utente.component';
import { Libro } from './../views/catalogo/catalogo-libri/catalogo-libri.component';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  urlGenerico = 'https://biblioteca-app-angular.herokuapp.com';
  libriUrl = 'libro';
  utentiUrl = 'utente';

  constructor(private httpClient: HttpClient) { }

  // GET ALL LIBRI
  Lista(): Observable<any> {
    return this.httpClient.get(this.urlGenerico + '/' + this.libriUrl);
  }
  // GET BY ID
  // getLibroById(id: number): Libro {
  //   this.httpClient.get();
  // }
  // UPDATE LIBRI
  updateLibro(libro: Libro) {
    this.httpClient.put<Libro>(this.urlGenerico + '/' + this.libriUrl + '/' + libro.id, libro).subscribe();
  }
  // CREATE LIBRI
  createLibro(libro: Libro) {
  this.httpClient.post(this.urlGenerico + '/' + this.libriUrl, libro).subscribe();
}
  // DELETE LIBRI
  deleteLibro(id: number) {
    this.httpClient.delete(this.urlGenerico + '/' + this.libriUrl + '/' + id).subscribe();
  }
  // MODIFICA UTENTE
  updateUtente(utente: UtenteForm) {
    this.httpClient.put<Libro>(this.urlGenerico + '/' + this.utentiUrl + '/' + utente.login, utente).subscribe();
  }
  // Modifica() {
  //   this.httpClient.put('http://localhost:3000/libri');
  // }

  // MODIFICA NOME UTENTE
  updateName(user: UtenteForm) {
    this.httpClient.put<UtenteForm>(this.urlGenerico + '/' + this.utentiUrl + '/' + user.id, user).subscribe();
  }
}
