import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DatePipe, CommonModule } from '@angular/common';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { AdminLayoutComponent } from './admin-layout.component';
import { NavbarModule } from 'app/navbar/navbar.module';
import { SidebarModule } from 'app/sidebar/sidebar.module';
import { FooterModule } from 'app/components/footer/footer.module';
import { SpinnerModule } from 'app/utility/spinner/spinner.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    NavbarModule,
    SidebarModule,
    FooterModule,
    SpinnerModule,
  ],
  declarations: [
    AdminLayoutComponent,
  ],


  providers: [
    DatePipe
  ]
})

export class AdminLayoutModule { }
