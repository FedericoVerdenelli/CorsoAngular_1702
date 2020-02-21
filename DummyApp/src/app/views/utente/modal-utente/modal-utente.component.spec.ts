import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUtenteComponent } from './modal-utente.component';

describe('ModalUtenteComponent', () => {
  let component: ModalUtenteComponent;
  let fixture: ComponentFixture<ModalUtenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalUtenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalUtenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
