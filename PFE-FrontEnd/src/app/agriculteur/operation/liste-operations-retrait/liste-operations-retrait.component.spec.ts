import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeOperationsRetraitComponent } from './liste-operations-retrait.component';

describe('ListeOperationsRetraitComponent', () => {
  let component: ListeOperationsRetraitComponent;
  let fixture: ComponentFixture<ListeOperationsRetraitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeOperationsRetraitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeOperationsRetraitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
