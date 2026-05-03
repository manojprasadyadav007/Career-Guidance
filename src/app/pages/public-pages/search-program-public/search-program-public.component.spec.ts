import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchProgramPublicComponent } from './search-program-public.component';

describe('SearchProgramPublicComponent', () => {
  let component: SearchProgramPublicComponent;
  let fixture: ComponentFixture<SearchProgramPublicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchProgramPublicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchProgramPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
