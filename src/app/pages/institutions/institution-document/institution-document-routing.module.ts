import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InstitutionDocumentComponent } from './institution-document.component';
import { InstitutionDocumentModule } from './institution-document.module';




@NgModule({
  imports: [InstitutionDocumentModule,
  RouterModule.forChild([
    { path: '', component:  InstitutionDocumentComponent  },
  ])]
})
export class InstitutionDocumentRoutingModule { }
