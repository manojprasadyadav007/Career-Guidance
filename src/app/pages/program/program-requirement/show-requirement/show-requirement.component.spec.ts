import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowRequirementComponent } from './show-requirement.component';

describe('ShowRequirementComponent', () => {
  let component: ShowRequirementComponent;
  let fixture: ComponentFixture<ShowRequirementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowRequirementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowRequirementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
