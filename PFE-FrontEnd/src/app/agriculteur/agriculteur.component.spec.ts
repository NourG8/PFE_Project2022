import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgriculteurComponent } from './agriculteur.component';

describe('AgriculteurComponent', () => {
  let component: AgriculteurComponent;
  let fixture: ComponentFixture<AgriculteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgriculteurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgriculteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
