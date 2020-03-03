import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  openFrontend(frontend){
    this.modalService.open(frontend);
  }

  openBackend(backend){
    this.modalService.open(backend);
  }

  openAbout(about){
    this.modalService.open(about);
  }

  ngOnInit() {
  }

}
