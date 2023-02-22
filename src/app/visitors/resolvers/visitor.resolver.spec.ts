import { TestBed } from '@angular/core/testing';

import { VisitorResolver } from './visitor.resolver';

describe('VisitorResolver', () => {
  let resolver: VisitorResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(VisitorResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
