import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ReferenceService } from './reference.service';

describe('ReferenceService', () => {
  let service: ReferenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ReferenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
