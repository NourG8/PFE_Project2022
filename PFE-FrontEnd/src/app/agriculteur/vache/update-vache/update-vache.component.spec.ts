import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateVacheComponent } from './update-vache.component';

describe('UpdateVacheComponent', () => {
  let component: UpdateVacheComponent;
  let fixture: ComponentFixture<UpdateVacheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateVacheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateVacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
