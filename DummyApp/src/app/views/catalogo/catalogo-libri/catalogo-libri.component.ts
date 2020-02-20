import { CrudService } from './../../../services/crud.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-catalogo-libri',
  templateUrl: './catalogo-libri.component.html',
  styleUrls: ['./catalogo-libri.component.css']
})
export class CatalogoLibriComponent implements OnInit {
  trama = false;
  menu = true;
  listaLibri: any = [];

  constructor(private crud: CrudService) { }

  ngOnInit() {
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
