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
      this.listaLibri = lista;
      console.log(lista);
    });

  }
  mostra() {
    this.trama = !this.trama;
    this.menu = !this.menu;
  }
}
