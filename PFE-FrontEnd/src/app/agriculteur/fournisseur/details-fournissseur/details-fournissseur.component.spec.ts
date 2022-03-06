import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsFournissseurComponent } from './details-fournissseur.component';

describe('DetailsFournissseurComponent', () => {
  let component: DetailsFournissseurComponent;
  let fixture: ComponentFixture<DetailsFournissseurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsFournissseurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsFournissseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
