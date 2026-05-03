import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { environment } from 'environments/environment';
import * as $ from 'jquery';
@Component({
  selector: 'app-file-upload-withpreview',
  templateUrl: './file-upload-withpreview.component.html',
  styleUrls: ['./file-upload-withpreview.component.scss']
})
export class FileUploadWithpreviewComponent implements OnInit {

  @Input()
  file: File;
  sizeerror: string;
  @Output()
  fileChange: EventEmitter<File> = new EventEmitter<File>();
  defaultSizeLimit = environment.fileSizeLimit;
  @Input()
  defaultImage: string;

  @Output()
  filePath: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  path: EventEmitter<any> = new EventEmitter<any>();


  constructor() { }

  ngOnInit() {
  }

  onFileChange(fileInput: any) {
    this.sizeerror = undefined;
    this.file = <File>fileInput.target.files[0];
    if ((this.file.size / (1024)) > this.defaultSizeLimit) {
      this.sizeerror = `Size limit exceed, max ${this.defaultSizeLimit} KB Allowed`;
      this.file = undefined;
    }
    this.fileChange.emit(this.file);
  }

  removePicture() {
    this.path.emit('');
  }


}
