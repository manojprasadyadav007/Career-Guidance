import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddKnowledgeCentreComponent } from './add-knowledge-centre.component';

describe('AddKnowledgeCentreComponent', () => {
  let component: AddKnowledgeCentreComponent;
  let fixture: ComponentFixture<AddKnowledgeCentreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddKnowledgeCentreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddKnowledgeCentreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
