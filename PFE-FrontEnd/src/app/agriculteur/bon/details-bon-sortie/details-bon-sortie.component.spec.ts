import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsBonSortieComponent } from './details-bon-sortie.component';

describe('DetailsBonSortieComponent', () => {
  let component: DetailsBonSortieComponent;
  let fixture: ComponentFixture<DetailsBonSortieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsBonSortieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsBonSortieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
