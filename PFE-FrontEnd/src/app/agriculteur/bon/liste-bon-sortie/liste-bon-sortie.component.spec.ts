import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeBonSortieComponent } from './liste-bon-sortie.component';

describe('ListeBonSortieComponent', () => {
  let component: ListeBonSortieComponent;
  let fixture: ComponentFixture<ListeBonSortieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeBonSortieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeBonSortieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
