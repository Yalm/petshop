import { TestBed, async, inject } from '@angular/core/testing';

import { CheckLoginGuard } from './check-login.guard';

describe('CheckLoginGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CheckLoginGuard]
    });
  });

  it('should ...', inject([CheckLoginGuard], (guard: CheckLoginGuard) => {
    expect(guard).toBeTruthy();
  }));
});
