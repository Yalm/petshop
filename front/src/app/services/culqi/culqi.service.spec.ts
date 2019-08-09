import { TestBed } from '@angular/core/testing';

import { CulqiService } from './culqi.service';

describe('CulqiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CulqiService = TestBed.get(CulqiService);
    expect(service).toBeTruthy();
  });
});
