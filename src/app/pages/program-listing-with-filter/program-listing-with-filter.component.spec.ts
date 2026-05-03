import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramListingWithFilterComponent } from './program-listing-with-filter.component';

describe('ProgramListingWithFilterComponent', () => {
  let component: ProgramListingWithFilterComponent;
  let fixture: ComponentFixture<ProgramListingWithFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramListingWithFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramListingWithFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
