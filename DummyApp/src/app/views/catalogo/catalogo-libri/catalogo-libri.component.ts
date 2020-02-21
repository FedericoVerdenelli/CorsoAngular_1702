import { CrudService } from './../../../services/crud.service';
import { Component, OnInit } from '@angular/core';

export class Libro {
  id: number;
  titolo: string;
  autore: string;
  trama: string;
  primaEdizione: number;
  creatore: string;

  constructor(
    id ,
    titolo = '',
    autore = '',
    trama = '',
    primaEdizione ,
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
  trama = false;
  menu = true;
  listaLibri: any = [];
  mostraUtente = JSON.parse(sessionStorage.getItem('isLogged'));
  libro = new Libro(1004, 'z', 'b', 'c', '2000', this.mostraUtente.nome ) ; // libro test da inserire
  constructor(private crud: CrudService) { }

  ngOnInit() {

   // this.crud.updateLibro(this.libro); // libro test che viene inserito e modifica il libro al suo id
   // this.crud.createLibro(this.libro); // libro test viene creato nel database !!!!!CAMBIA L'ID!!!!!
   // this.crud.deleteLibro(1004) // libro test viene deletato, OCCHIO ALL'ID SE VA IN ERRORE
    this.crud.Lista().subscribe(lista => {
      lista.forEach( el => {
        el.aperto = false;
      });
      this.listaLibri = lista;
      console.log(lista);
    });

  }
  mostra(libro) {
    libro.aperto = !libro.aperto;
  }
  modifica(libro) {
    alert(libro.id);
  }
}
