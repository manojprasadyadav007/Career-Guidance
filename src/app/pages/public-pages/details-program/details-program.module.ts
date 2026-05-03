import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { DetailsProgramComponent } from './details-program.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SingleCommaModule } from 'app/directive/singleComma/single-comma.module';



@NgModule({
  declarations: [DetailsProgramComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{path:'',component:DetailsProgramComponent}]),
    MatButtonModule,
    MatIconModule,
    SingleCommaModule,
  ]
  
})
export class DetailsProgramModule { }
