import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShowUserComponent } from './show-user/show-user.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ShowMapComponent } from '../advance-report/show-map/show-map.component';

const routes: Routes = [ 
  { path: '', component: ShowUserComponent },
{ path: 'add-user', component: AddUserComponent },
{ path: 'edit-user/:id', component: AddUserComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {
 }
