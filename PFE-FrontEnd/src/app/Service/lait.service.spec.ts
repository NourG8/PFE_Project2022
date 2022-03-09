import { TestBed } from '@angular/core/testing';

import { LaitService } from './lait.service';

describe('LaitService', () => {
  let service: LaitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LaitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
