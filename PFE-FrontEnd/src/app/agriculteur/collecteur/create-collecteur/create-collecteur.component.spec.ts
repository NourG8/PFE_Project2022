import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCollecteurComponent } from './create-collecteur.component';

describe('CreateCollecteurComponent', () => {
  let component: CreateCollecteurComponent;
  let fixture: ComponentFixture<CreateCollecteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCollecteurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCollecteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
