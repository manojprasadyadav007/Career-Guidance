import { NgModule } from "@angular/core";
import { FileUploadComponent } from "./file-upload.component";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RegisterFormControlModelModule } from "app/directive/register-form-control-model/register-form-control-model.module";
import { FileUploadNewComponent } from './file-upload-new/file-upload-new.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { FileUploaderComponent } from './file-uploader/file-uploader.component';

@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        FormsModule,
        RegisterFormControlModelModule,
        MatTooltipModule
    ],
    declarations:[FileUploadComponent, FileUploadNewComponent, FileUploaderComponent],
    exports:[FileUploadComponent,FileUploadNewComponent, FileUploaderComponent]
})
export class FileUploadModule{}