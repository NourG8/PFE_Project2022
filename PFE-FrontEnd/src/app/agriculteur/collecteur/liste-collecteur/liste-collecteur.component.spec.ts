import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeCollecteurComponent } from './liste-collecteur.component';

describe('ListeCollecteurComponent', () => {
  let component: ListeCollecteurComponent;
  let fixture: ComponentFixture<ListeCollecteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeCollecteurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeCollecteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
