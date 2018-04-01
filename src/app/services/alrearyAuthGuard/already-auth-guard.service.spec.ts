import { TestBed, inject } from '@angular/core/testing';

import { AlreadyAuthGuardService } from './already-auth-guard.service';

describe('AlreadyAuthGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlreadyAuthGuardService]
    });
  });

  it('should be created', inject([AlreadyAuthGuardService], (service: AlreadyAuthGuardService) => {
    expect(service).toBeTruthy();
  }));
});
