import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUploadWithpreviewComponent } from './file-upload-withpreview.component';

describe('FileUploadWithpreviewComponent', () => {
  let component: FileUploadWithpreviewComponent;
  let fixture: ComponentFixture<FileUploadWithpreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileUploadWithpreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileUploadWithpreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
