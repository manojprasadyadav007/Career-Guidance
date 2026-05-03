import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignInstitutionComponent } from './assign-institution.component';

describe('AssignInstitutionComponent', () => {
  let component: AssignInstitutionComponent;
  let fixture: ComponentFixture<AssignInstitutionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignInstitutionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignInstitutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
