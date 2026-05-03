import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RemoveSpacesDirective } from './removespaces.directive';



@NgModule({
  declarations: [RemoveSpacesDirective],
  imports: [
    CommonModule
  ],
  exports: [RemoveSpacesDirective]
})
export class RemoveSpacesModule { }
