/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MadlibsService } from './madlibs.service';

describe('MadlibsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MadlibsService]
    });
  });

  it('should ...', inject([MadlibsService], (service: MadlibsService) => {
    expect(service).toBeTruthy();
  }));
});
