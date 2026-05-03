import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckUsernameDirective } from './check-username.directive';



@NgModule({
  declarations: [CheckUsernameDirective],
  imports: [
    CommonModule
  ],
  exports:[CheckUsernameDirective]
})
export class CheckUsernameModule { }
