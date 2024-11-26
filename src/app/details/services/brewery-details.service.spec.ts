import { TestBed } from '@angular/core/testing';

import { BreweryDetailsService } from './brewery-details.service';

describe('BreweryDetailsService', () => {
  let service: BreweryDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BreweryDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
