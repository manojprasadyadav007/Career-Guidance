import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEnglishRequirementComponent } from './add-english-requirement.component';

describe('AddEnglishRequirementComponent', () => {
  let component: AddEnglishRequirementComponent;
  let fixture: ComponentFixture<AddEnglishRequirementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEnglishRequirementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEnglishRequirementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
