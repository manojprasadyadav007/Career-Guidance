import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatTableModule, MatDialogModule, MatMenuModule, MatIconModule, MatRadioModule, MatCheckboxModule, MatOptionModule, MatProgressBarModule, MatPaginatorModule, MatTooltipModule, MatStepperModule, MatSlideToggleModule, MatExpansionModule, MatDatepickerModule, MatSortModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material';
import { Ng5SliderModule } from 'ng5-slider';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
//import { ConfirmBoxComponent } from 'app/utility/confirm-box/confirm-box.component';
import { ConfirmBoxModule } from 'app/utility/confirm-box/confirm-box.module'
import { StudentLoginDialogComponent } from 'app/pages/student-login-dialog/student-login-dialog.component';
import { ShowCampusComponent } from 'app/pages/campus/show-campus/show-campus.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { ConfirmPasswordDirective } from 'app/directive/custom-validator/confirm-password/confirm-password.directive';
import { InstitutionsDetailsComponent } from 'app/pages/institutions/institutions-details/institutions-details.component';
import { DateTimePickerComponent } from './date-time-picker/date-time-picker.component';
import { FileUploadWithpreviewComponent } from './file-upload-withpreview/file-upload-withpreview.component';
import { HoursComponent } from './hours/hours.component';
import { MinutesComponent } from './minutes/minutes.component';
import { UploadDocumentsComponent } from 'app/pages/students/student-document/upload-documents/upload-documents.component';
import { ClickToEditComponent } from './click-to-edit/click-to-edit.component';
import { BackButtonModule } from 'app/directive/back-button/back-button.module';
import { MinValueModule } from 'app/directive/custom-validator/min-value/min-value.module';
import { MaxValueModule } from 'app/directive/custom-validator/max-value/max-value.module';
import { FileUploadModule } from './file-upload/fiile-upload.module';
import { MsmFormControlModule } from './msm-form-control/msm-form-control.module';
import { RegisterFormControlModelModule } from 'app/directive/register-form-control-model/register-form-control-model.module';
import { DatePickerModule } from './date-picker/date-picker.module';
import { CheckUsernameModule } from 'app/directive/custom-validator/check-username/check-username.module';
import { CheckPassportnoModule } from 'app/directive/custom-validator/check-passportno/check-passportno.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { StringFilterByModule } from 'app/custom-pipes/string-filter-by/string-filter-by.module';
import { TrackByPropertyModule } from 'app/directive/track-by-property/track-by-property.module';
import { InputBoxDialogModule } from 'app/utility/input-box-dialog/input-box-dialog.module';
import { ConfirmPasswordModule } from 'app/directive/custom-validator/confirm-password/confirm-password.module';
import { ClickToEditModule } from './click-to-edit/click-to-edit.module';
import { HoursControlModule } from './hours-control/hours-control.module';
import { MinutesModule } from './minutes/minutes.module';
import { HoursModule } from './hours/hours.module';
import { FileUploadWithpreviewModule } from './file-upload-withpreview/file-upload-withpreview.module';
import { DateTimePickerModule } from './date-time-picker/date-time-picker.module';
import { RemoveSpacesModule} from 'app/directive/remove-spaces/removespaces.module';
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatStepperModule,
    MatRadioModule,
    MatCheckboxModule,
    MatIconModule,
    MatOptionModule,
    MatSlideToggleModule,
    MatExpansionModule,
    Ng5SliderModule,
    NgxExtendedPdfViewerModule,
    MatTableModule,
    MatDialogModule, MatProgressBarModule, NgSelectModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatPaginatorModule,
    MatSortModule,
    
    BackButtonModule,
    MinValueModule,
    MaxValueModule,
    FileUploadModule,
    MsmFormControlModule,
    RegisterFormControlModelModule,
    DatePickerModule,
    CheckUsernameModule,
    CheckPassportnoModule,
    NgxMatSelectSearchModule , StringFilterByModule ,TrackByPropertyModule,ConfirmBoxModule,
    InputBoxDialogModule,
    ConfirmPasswordModule,
    RemoveSpacesModule,

    ClickToEditModule,
    HoursControlModule,
    MinutesModule,
    HoursModule,
    FileUploadWithpreviewModule,
    DateTimePickerModule
    
  ],
  declarations: [
    StudentLoginDialogComponent,
    ShowCampusComponent,
    UploadDocumentsComponent,
   InstitutionsDetailsComponent
  ],
  exports: [
    MinValueModule,
    MaxValueModule,
    FileUploadModule,
    MsmFormControlModule,
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatDialogModule,
    MatMenuModule,
    MatIconModule,
    MatRadioModule,
    MatCheckboxModule,
    MatOptionModule,
    MatProgressBarModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatStepperModule,
    MatSlideToggleModule,
    MatExpansionModule,
    Ng5SliderModule,
    NgxExtendedPdfViewerModule, 
    MatProgressBarModule, 
    NgSelectModule,
    MatDatepickerModule,
    MatMomentDateModule,
    
    MatSortModule,
    ConfirmPasswordDirective   ,
    InstitutionsDetailsComponent,
    DateTimePickerComponent,
    FileUploadWithpreviewComponent,
    HoursComponent,
    MinutesComponent,
    ClickToEditComponent,
    
    RegisterFormControlModelModule,
    DatePickerModule,
    CheckUsernameModule,
    CheckPassportnoModule,
    ConfirmBoxModule,
    InputBoxDialogModule,
    ConfirmPasswordModule,

    ClickToEditModule,
    HoursControlModule,
    MinutesModule,
    HoursModule,
    FileUploadWithpreviewModule,
    DateTimePickerModule
  ],
  providers:[
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {appearance:'outline'}
    },
  ],
  entryComponents: [ UploadDocumentsComponent,    StudentLoginDialogComponent ]
})
export class ComponentsModule {

}
