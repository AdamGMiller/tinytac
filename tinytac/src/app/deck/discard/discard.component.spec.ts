import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscardComponent } from './discard.component';

describe('DiscardComponent', () => {
  let component: DiscardComponent;
  let fixture: ComponentFixture<DiscardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
