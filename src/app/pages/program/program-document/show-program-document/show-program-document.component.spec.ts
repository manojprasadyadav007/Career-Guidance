import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowProgramDocumentComponent } from './show-program-document.component';

describe('ShowProgramDocumentComponent', () => {
  let component: ShowProgramDocumentComponent;
  let fixture: ComponentFixture<ShowProgramDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowProgramDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowProgramDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
