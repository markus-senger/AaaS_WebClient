import { TestBed } from '@angular/core/testing';

import { CanNavigateToAppGuard } from './can-navigate-to-app.guard';

describe('CanNavigateToAppGuard', () => {
  let guard: CanNavigateToAppGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanNavigateToAppGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
