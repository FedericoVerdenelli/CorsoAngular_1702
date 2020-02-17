import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoLibriComponent } from './catalogo-libri.component';

describe('CatalogoLibriComponent', () => {
  let component: CatalogoLibriComponent;
  let fixture: ComponentFixture<CatalogoLibriComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogoLibriComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogoLibriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
