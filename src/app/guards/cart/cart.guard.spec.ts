import { TestBed, async, inject } from '@angular/core/testing';

import { CartGuard } from './cart.guard';

describe('CartGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CartGuard]
    });
  });

  it('should ...', inject([CartGuard], (guard: CartGuard) => {
    expect(guard).toBeTruthy();
  }));
});
