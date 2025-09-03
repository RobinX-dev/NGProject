import { TestBed } from '@angular/core/testing';

import { Detailservice } from './detailservice';

describe('Detailservice', () => {
  let service: Detailservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Detailservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
