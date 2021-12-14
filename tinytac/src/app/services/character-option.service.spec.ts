import { TestBed } from '@angular/core/testing';
import { CharacterOptionService } from './character-option.service';

describe('CharacterOptionService', () => {
  let service: CharacterOptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CharacterOptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
