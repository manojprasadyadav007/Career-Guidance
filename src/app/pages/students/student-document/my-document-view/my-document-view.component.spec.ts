import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDocumentViewComponent } from './my-document-view.component';

describe('MyDocumentViewComponent', () => {
  let component: MyDocumentViewComponent;
  let fixture: ComponentFixture<MyDocumentViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyDocumentViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyDocumentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
