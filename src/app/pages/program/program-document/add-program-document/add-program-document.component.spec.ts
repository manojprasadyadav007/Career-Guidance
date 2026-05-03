import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProgramDocumentComponent } from './add-program-document.component';

describe('AddProgramDocumentComponent', () => {
  let component: AddProgramDocumentComponent;
  let fixture: ComponentFixture<AddProgramDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProgramDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProgramDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
