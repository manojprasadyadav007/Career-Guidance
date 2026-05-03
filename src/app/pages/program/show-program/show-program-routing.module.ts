import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShowProgramComponent } from './show-program.component';
import { AuthGuard } from 'app/guards/auth.guard';
import { ShowProgramModule } from './show-program.module';


const routes: Routes = [
  { path: '', component: ShowProgramComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [
    ShowProgramModule,
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShowProgramRoutingModule { }
