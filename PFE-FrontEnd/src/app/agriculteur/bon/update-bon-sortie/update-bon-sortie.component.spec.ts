import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBonSortieComponent } from './update-bon-sortie.component';

describe('UpdateBonSortieComponent', () => {
  let component: UpdateBonSortieComponent;
  let fixture: ComponentFixture<UpdateBonSortieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateBonSortieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateBonSortieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
