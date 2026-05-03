import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'app/components/components.module';
import { DeletedApplicationsComponent } from './deleted-applications/deleted-applications.component';
import { RouterModule } from '@angular/router';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { SentenceCasePipe } from 'app/custom-pipes/sentence-case/sentence-case.pipe';
import { SentenceCaseModule } from 'app/custom-pipes/sentence-case/sentence-case.module';



@NgModule({
  declarations: [DeletedApplicationsComponent,],
  imports: [
    CommonModule,
    SentenceCaseModule,
    ComponentsModule,
    RouterModule.forChild([
      { path: '', component: DeletedApplicationsComponent },
      { path: 'application', component: DeletedApplicationsComponent },
    ]),
    DxDataGridModule
  ]
})
export class RetrieveModule { }
