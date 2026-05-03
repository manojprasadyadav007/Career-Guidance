import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadWithpreviewComponent } from './file-upload-withpreview.component';
import { MatFormFieldModule } from '@angular/material';



@NgModule({
  declarations: [ FileUploadWithpreviewComponent],
  imports: [
    CommonModule,
    MatFormFieldModule
  ],
  exports: [FileUploadWithpreviewComponent]
})
export class FileUploadWithpreviewModule { }
