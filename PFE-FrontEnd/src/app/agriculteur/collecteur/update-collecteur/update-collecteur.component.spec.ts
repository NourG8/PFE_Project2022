import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCollecteurComponent } from './update-collecteur.component';

describe('UpdateCollecteurComponent', () => {
  let component: UpdateCollecteurComponent;
  let fixture: ComponentFixture<UpdateCollecteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateCollecteurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCollecteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
