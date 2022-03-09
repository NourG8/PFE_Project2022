import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOperationRemplissageComponent } from './create-operation-remplissage.component';

describe('CreateOperationRemplissageComponent', () => {
  let component: CreateOperationRemplissageComponent;
  let fixture: ComponentFixture<CreateOperationRemplissageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOperationRemplissageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOperationRemplissageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
