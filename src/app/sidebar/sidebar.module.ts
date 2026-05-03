import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar.component';
import { MenuItemComponent } from 'app/sidebar/menu-item/menu-item.component';
import { RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FeedbackModule } from 'app/utility/feedback/feedback.module';
import { MatDialogModule } from '@angular/material/dialog';
import { ComponentsModule } from 'app/components/components.module';



@NgModule({
  declarations: [SidebarComponent,  MenuItemComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatTooltipModule,
    FeedbackModule,
    MatDialogModule,
    ComponentsModule
  ],
  exports:[SidebarComponent]
})
export class SidebarModule { }
