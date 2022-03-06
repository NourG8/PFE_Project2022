import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatailsBonComponent } from './datails-bon.component';

describe('DatailsBonComponent', () => {
  let component: DatailsBonComponent;
  let fixture: ComponentFixture<DatailsBonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatailsBonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatailsBonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
