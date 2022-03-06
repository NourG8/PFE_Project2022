import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVacheComponent } from './create-vache.component';

describe('CreateVacheComponent', () => {
  let component: CreateVacheComponent;
  let fixture: ComponentFixture<CreateVacheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateVacheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateVacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
