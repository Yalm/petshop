import { TestBed, async, inject } from '@angular/core/testing';

import { CompleteInfoGuard } from './complete-info.guard';

describe('CompleteInfoGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CompleteInfoGuard]
    });
  });

  it('should ...', inject([CompleteInfoGuard], (guard: CompleteInfoGuard) => {
    expect(guard).toBeTruthy();
  }));
});
