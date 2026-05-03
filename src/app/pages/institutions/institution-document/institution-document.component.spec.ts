import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionDocumentComponent } from './institution-document.component';

describe('InstitutionDocumentComponent', () => {
  let component: InstitutionDocumentComponent;
  let fixture: ComponentFixture<InstitutionDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitutionDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
