import { TestBed } from '@angular/core/testing';

import { BreweriesSearchService } from './breweries-search.service';

describe('BreweriesSearchService', () => {
  let service: BreweriesSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BreweriesSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
