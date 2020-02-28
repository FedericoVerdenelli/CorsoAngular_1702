import { Component, OnInit, Input } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Libro } from '../catalogo-libri/catalogo-libri.component';

@Component({
  selector: 'app-ngbd-modal-config',
  templateUrl: './ngbd-modal-config.component.html',
  styleUrls: ['./ngbd-modal-config.component.css']
})
export class NgbdModalConfigComponent implements OnInit {
  @Input() librolibro;

  constructor(config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  // open() {
  //   this.modalService.open(NgbdModalConfigComponent);
  // }
  ngOnInit() {
  }
  close() {
    this.modalService.dismissAll();
  }

}
