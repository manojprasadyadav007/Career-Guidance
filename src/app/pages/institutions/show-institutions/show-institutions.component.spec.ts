import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowInstitutionsComponent } from './show-institutions.component';

describe('ShowInstitutionsComponent', () => {
  let component: ShowInstitutionsComponent;
  let fixture: ComponentFixture<ShowInstitutionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowInstitutionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowInstitutionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
