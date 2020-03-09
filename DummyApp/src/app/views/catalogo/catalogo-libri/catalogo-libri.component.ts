import { CrudService } from './../../../services/crud.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalConfigComponent } from '../ngbd-modal-config/ngbd-modal-config.component';


export class Libro {
  id: string;
  titolo: string;
  autore: string;
  trama: string;
  primaEdizione: string;
  creatore: string;

  constructor(
    id = '',
    titolo = '',
    autore = '',
    trama = '',
    primaEdizione = '',
    creatore = '',
  ) {
    this.id = id;
    this.titolo = titolo;
    this.autore = autore;
    this.trama = trama;
    this.primaEdizione = primaEdizione;
    this.creatore = creatore;
  }
}



@Component({
  selector: 'app-catalogo-libri',
  templateUrl: './catalogo-libri.component.html',
  styleUrls: ['./catalogo-libri.component.css']
})
export class CatalogoLibriComponent implements OnInit {
  show = false;
  listaLibri: any = [];
  mostraUtente = JSON.parse(sessionStorage.getItem('isLogged'));
  librolibro: Libro = new Libro();
  // libro = new Libro('1004', 'z', 'b', 'c', '2000', this.mostraUtente.nome ) ; // libro test da inserire
  constructor(config: NgbModalConfig, private crud: CrudService, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {

   // this.crud.updateLibro(this.libro); // libro test che viene inserito e modifica il libro al suo id
   // this.crud.createLibro(this.libro); // libro test viene creato nel database !!!!!CAMBIA L'ID!!!!!
   // this.crud.deleteLibro(1004) // libro test viene deletato, OCCHIO ALL'ID SE VA IN ERRORE
    this.crud.Lista().subscribe(lista => {
      lista.forEach( el => {
        el.aperto = false;
      });
      this.listaLibri = lista;
    });

  }
  mostra(libro) {
    libro.aperto = !libro.aperto;
  }
  modifica(libro) {
    this.show = !this.show;
  }
  open(editProfileModal, libro) {
    this.modalService.open(editProfileModal);
    this.librolibro = libro;
  }
  openAggiungi(aggiungiLibroModal) {
    this.modalService.open(aggiungiLibroModal);
  }
  salva(libro) {
    this.librolibro = libro;
    console.log(libro);
    this.crud.updateLibro(this.librolibro);
    this.modalService.dismissAll();
  }
  elimina(id) {
    this.librolibro.id = id;
    this.crud.deleteLibro(id);
    console.log(id);
    this.modalService.dismissAll();
    window.location.reload();
  }
  crea(libro) {
    this.librolibro.creatore = this.mostraUtente.nome;
    this.librolibro = libro;
    this.crud.createLibro(libro);
    this.modalService.dismissAll();
    window.location.reload();
  }
  close() {
    this.modalService.dismissAll();
  }
}
