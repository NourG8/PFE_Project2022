import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeBonComponent } from './liste-bon.component';

describe('ListeBonComponent', () => {
  let component: ListeBonComponent;
  let fixture: ComponentFixture<ListeBonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeBonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeBonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
