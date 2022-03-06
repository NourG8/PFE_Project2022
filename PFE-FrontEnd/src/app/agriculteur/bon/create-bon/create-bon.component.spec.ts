import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBonComponent } from './create-bon.component';

describe('CreateBonComponent', () => {
  let component: CreateBonComponent;
  let fixture: ComponentFixture<CreateBonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateBonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
