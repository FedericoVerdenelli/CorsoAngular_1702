import { CrudService } from './../../../services/crud.service';
import { Component, OnInit } from '@angular/core';
import { NgbdModalConfigComponent } from '../ngbd-modal-config/ngbd-modal-config.component';


@Component({
  selector: 'app-catalogo-libri',
  templateUrl: './catalogo-libri.component.html',
  styleUrls: ['./catalogo-libri.component.css']
})
export class CatalogoLibriComponent implements OnInit {
  trama = false;
  menu = true;
  listaLibri: any = [];
  modificaLibri;
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
