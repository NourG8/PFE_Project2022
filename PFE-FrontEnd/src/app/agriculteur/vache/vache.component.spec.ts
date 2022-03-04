import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacheComponent } from './vache.component';

describe('VacheComponent', () => {
  let component: VacheComponent;
  let fixture: ComponentFixture<VacheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VacheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
