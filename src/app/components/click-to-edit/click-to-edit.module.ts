import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClickToEditComponent } from './click-to-edit.component';
import { FormsModule} from '@angular/forms';

@NgModule({
  declarations: [ ClickToEditComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [ClickToEditComponent]
})
export class ClickToEditModule { }
