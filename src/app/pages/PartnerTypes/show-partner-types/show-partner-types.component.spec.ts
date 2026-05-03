import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPartnerTypesComponent } from './show-partner-types.component';

describe('ShowPartnerTypesComponent', () => {
  let component: ShowPartnerTypesComponent;
  let fixture: ComponentFixture<ShowPartnerTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowPartnerTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowPartnerTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
