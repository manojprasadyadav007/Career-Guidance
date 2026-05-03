import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddSchoolComponent } from './add-school/add-school.component';
import { ShowSchoolComponent } from './show-school/show-school.component';
import { ComponentsModule } from 'app/components/components.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { StringFilterByModule } from 'app/custom-pipes/string-filter-by/string-filter-by.module';
import { TrackByPropertyModule } from 'app/directive/track-by-property/track-by-property.module';
import { DisplaySchoolComponent } from './display-school/display-school.component';
import { ConfirmBoxModule } from 'app/utility/confirm-box/confirm-box.module';
import { RemoveSpacesModule} from '../../../directive/remove-spaces/removespaces.module';
import { NumberValidationModule } from '../../../directive/number-validation/number-validation.module';
import { UpperCaseModule} from '../../../directive/toUppercase/touppercase.module';

@NgModule({
  declarations: [AddSchoolComponent,ShowSchoolComponent,DisplaySchoolComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    NgxMatSelectSearchModule,
    ConfirmBoxModule,

    StringFilterByModule ,
    TrackByPropertyModule,

    RemoveSpacesModule,
    NumberValidationModule,
    UpperCaseModule
  ],
  entryComponents:[AddSchoolComponent],
  exports:[ShowSchoolComponent,DisplaySchoolComponent]
})
export class SchoolModule { }
