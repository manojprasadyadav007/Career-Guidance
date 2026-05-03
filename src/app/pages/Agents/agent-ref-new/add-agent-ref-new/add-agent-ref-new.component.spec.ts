import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAgentRefNewComponent } from './add-agent-ref-new.component';

describe('AddAgentRefNewComponent', () => {
  let component: AddAgentRefNewComponent;
  let fixture: ComponentFixture<AddAgentRefNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAgentRefNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAgentRefNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
