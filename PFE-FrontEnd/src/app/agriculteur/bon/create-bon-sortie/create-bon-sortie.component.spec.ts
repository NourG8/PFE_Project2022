import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBonSortieComponent } from './create-bon-sortie.component';

describe('CreateBonSortieComponent', () => {
  let component: CreateBonSortieComponent;
  let fixture: ComponentFixture<CreateBonSortieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateBonSortieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBonSortieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
