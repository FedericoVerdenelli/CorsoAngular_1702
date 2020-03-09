import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-preferiti',
  templateUrl: './preferiti.component.html',
  styleUrls: ['./preferiti.component.css']
})
export class PreferitiComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  mostra(libro) {
    libro.aperto = !libro.aperto;
  }
}
