import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgoatPassword1Component } from './forgoat-password1.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ForgoatPassword1Component],
  imports: [
    CommonModule,
    RouterModule.forChild(
      [{path:'',component:ForgoatPassword1Component}]
    ),
    FormsModule,
  ]
})
export class ForgoatPassword1Module { }
