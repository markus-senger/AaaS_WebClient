import { TestBed } from '@angular/core/testing';

import { AaasService } from './aaas.service';

describe('AaasService', () => {
  let service: AaasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AaasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
