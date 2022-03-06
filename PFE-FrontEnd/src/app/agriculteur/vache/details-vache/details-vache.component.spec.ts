import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsVacheComponent } from './details-vache.component';

describe('DetailsVacheComponent', () => {
  let component: DetailsVacheComponent;
  let fixture: ComponentFixture<DetailsVacheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsVacheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsVacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
