import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrintComponent } from '../print/print.component';
import { ComponentsModule } from 'app/components/components.module';
import { RouterModule } from '@angular/router';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { SentenceCaseModule } from 'app/custom-pipes/sentence-case/sentence-case.module';



@NgModule({
  declarations: [PrintComponent],
  imports: [
    CommonModule,
    SentenceCaseModule,
    ComponentsModule,
    RouterModule.forChild([
      {
        path: 'print', component: PrintComponent
      }
    ]),
    NgxExtendedPdfViewerModule
  ],
  entryComponents: [PrintComponent]
})
export class PrintModule { }
