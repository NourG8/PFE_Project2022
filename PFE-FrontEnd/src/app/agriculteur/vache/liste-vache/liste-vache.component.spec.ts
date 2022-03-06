import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeVacheComponent } from './liste-vache.component';

describe('ListeVacheComponent', () => {
  let component: ListeVacheComponent;
  let fixture: ComponentFixture<ListeVacheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeVacheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeVacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
