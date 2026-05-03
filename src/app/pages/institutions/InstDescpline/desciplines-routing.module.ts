import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ShowDesciplinesComponent } from './show-desciplines/show-desciplines.component';
import { DesciplinesModule } from './desciplines.module';

@NgModule({
  imports: [
    DesciplinesModule,
    RouterModule.forChild([
      { path: '', component:  ShowDesciplinesComponent  },
    ])],
})
export class DesciplinesRoutingModule { }
