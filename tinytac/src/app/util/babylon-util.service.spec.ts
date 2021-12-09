import { TestBed } from '@angular/core/testing';

import { BabylonUtilService } from './babylon-util.service';

describe('BabylonUtilService', () => {
  let service: BabylonUtilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BabylonUtilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
