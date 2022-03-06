import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBonComponent } from './update-bon.component';

describe('UpdateBonComponent', () => {
  let component: UpdateBonComponent;
  let fixture: ComponentFixture<UpdateBonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateBonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateBonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
