import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsCollecteurComponent } from './details-collecteur.component';

describe('DetailsCollecteurComponent', () => {
  let component: DetailsCollecteurComponent;
  let fixture: ComponentFixture<DetailsCollecteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsCollecteurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsCollecteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
