import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupVisibilityComponent } from './group-visibility.component';

describe('GroupVisibilityComponent', () => {
  let component: GroupVisibilityComponent;
  let fixture: ComponentFixture<GroupVisibilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupVisibilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupVisibilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
