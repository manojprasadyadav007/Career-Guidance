import { NgModule } from '@angular/core';
import {  RouterModule } from '@angular/router';
 import { InstitutionMaterialShowComponent } from './institution-material-show/institution-material-show.component';
import { InstitutionMaterialShowFilesComponent } from './institution-material-show-files/institution-material-show-files.component';
import { InstitutionMaterialModule} from './institution-material.module';

@NgModule({
  imports: [
    InstitutionMaterialModule,
    RouterModule.forChild([
       { path: '', component:  InstitutionMaterialShowComponent },
     // { path: '', component:  InstitutionMaterialShowFilesComponent  },
    ])]
})
export class InstitutionMaterialRoutingModule { }
