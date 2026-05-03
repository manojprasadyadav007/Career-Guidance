import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CountryComponent } from './country.component';
import { CountryModule } from './country.module';

@NgModule({
  imports: [
    CountryModule,
    RouterModule.forChild([
      { path: '', component: CountryComponent }
    ])]
})
export class CountryRoutingModule { }
