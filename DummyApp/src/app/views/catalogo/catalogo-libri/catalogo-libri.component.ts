import { CrudService } from './../../../services/crud.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalConfigComponent } from '../ngbd-modal-config/ngbd-modal-config.component';


@Component({
  selector: 'app-catalogo-libri',
  templateUrl: './catalogo-libri.component.html',
  styleUrls: ['./catalogo-libri.component.css']
})
export class CatalogoLibriComponent implements OnInit {
  show = false;
  listaLibri: any = [];
  modificaLibri;
  constructor(private crud: CrudService, private modalService: NgbModal) { }

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
    console.log(this.show);
    this.show = !this.show;
    console.log(this.show);
  }
  open(content) {
    this.modalService.open(NgbdModalConfigComponent);
  }
}
