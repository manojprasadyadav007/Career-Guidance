import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CampusComponent } from './campus.component';
import { CampusModule } from './campus.module';

@NgModule({
  imports: [
    CampusModule,
    RouterModule.forChild([
      { path: '', component: CampusComponent  },
    ])],
})
export class CampusRoutingModule { }
