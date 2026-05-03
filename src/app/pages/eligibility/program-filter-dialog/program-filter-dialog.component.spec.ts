import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProgramFilterDialogComponent } from './program-filter-dialog.component';


describe('ProgramFilterComponent', () => {
  let component: ProgramFilterDialogComponent;
  let fixture: ComponentFixture<ProgramFilterDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramFilterDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramFilterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
