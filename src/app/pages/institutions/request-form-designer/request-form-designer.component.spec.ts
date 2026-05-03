import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestFormDesignerComponent } from './request-form-designer.component';

describe('RequestFormDesignerComponent', () => {
  let component: RequestFormDesignerComponent;
  let fixture: ComponentFixture<RequestFormDesignerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestFormDesignerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestFormDesignerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
