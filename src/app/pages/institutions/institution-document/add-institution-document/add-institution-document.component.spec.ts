import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInstitutionDocumentComponent } from './add-institution-document.component';

describe('AddInstitutionDocumentComponent', () => {
  let component: AddInstitutionDocumentComponent;
  let fixture: ComponentFixture<AddInstitutionDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddInstitutionDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInstitutionDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
