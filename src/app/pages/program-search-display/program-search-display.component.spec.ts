import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramSearchDisplayComponent } from './program-search-display.component';

describe('ProgramSearchDisplayComponent', () => {
  let component: ProgramSearchDisplayComponent;
  let fixture: ComponentFixture<ProgramSearchDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramSearchDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramSearchDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
