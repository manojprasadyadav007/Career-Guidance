import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes =[
  // {
  //   path: '',
  //   redirectTo: 'home',
  //   pathMatch: 'full',
  // },
  { path: '', redirectTo: 'signin',pathMatch:'full' },
  { path: 'signin', loadChildren: () => import('app/pages/public-pages/signin2/signin2.module').then(m => m.Signin2Module) },
  { path: 'institutions/institutions-details/:id', loadChildren: () => import('app/pages/public-pages/institution-page/institution-page.module').then(m => m.InstitutionPageModule) },
  { path: 'institutions/programs/details-program/:id', loadChildren: () => import('app/pages/public-pages/details-program/details-program.module').then(m => m.DetailsProgramModule)  },
  { path: 'search/program',loadChildren: () => import('app/pages/search-program/search-program.module').then(m => m.SearchProgramModule) },
  { path: 'eligibility', loadChildren: () => import('app/pages/eligibility/eligibility.module').then(m => m.EligibilityModule) },
  { path: 'verifyaccount/:code',loadChildren: () => import('app/pages/public-pages/verify-account/verify-account.module').then(m => m.VerifyAccountModule) },
  { path: 'reset-password/:code',loadChildren: () => import('app/pages/public-pages/reset-password1/reset-password1.module').then(m => m.ResetPassword1Module)  },
  { path: 'forgot-password', loadChildren: () => import('app/pages/public-pages/forgoat-password1/forgoat-password1.module').then(m => m.ForgoatPassword1Module)  },

  {
    path: 'search',
    loadChildren: () => import('app/pages/public-pages/search-program-public/search-program-public.module').then(m => m.SearchProgramPublicModule) 
  },
  {
    path: 'signup',
    loadChildren: () => import('app/pages/signup/signup.module').then(m => m.SignupModule)
  },

  {
    path: 'member',
    loadChildren:()=> import('./layouts/admin-layout/admin-layout.module').then(m=>m.AdminLayoutModule),
    canActivate: [AuthGuard]
  },
  
  // {
  //   path:'paymentstatus',
  //   loadChildren:()=> import('./pages/payment-status/payment-status.module').then(m=>m.PaymentStatusModule)
  // },
  {
    path:'terms-and-conditions/:parentType/:parentId/:parentKey',
    loadChildren:()=> import('./pages/term-and-condition-display/term-and-condition-display.module').then(m=>m.TermAndConditionDisplayModule)
  }, {
    path: 'payments',
    loadChildren: ()=> import('./components/payment-gateway/payment-gateway.module').then(m => m.PaymentGatewayModule)
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
       useHash: true,
    }),
  ],
  exports: [
    RouterModule
  ],
})
export class AppRoutingModule { }
