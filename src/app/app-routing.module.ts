import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
   path: '',
   loadChildren: () => import('../modules/signup/signup.module').then(m => m.SignupModule)
  },
  {
    path: 'aboutAcinemas',
    loadChildren: () => import('../modules/signup/signup.module').then(m => m.SignupModule)
   },
   {
    path: 'termsOfUse',
    loadChildren: () => import('../modules/signup/signup.module').then(m => m.SignupModule)
   },
   {
    path: 'privacypolicies',
    loadChildren: () => import('../modules/signup/signup.module').then(m => m.SignupModule)
   },
   {
    path: 'contact',
    loadChildren: () => import('../modules/signup/signup.module').then(m => m.SignupModule)
   },
   {
     path: '**', loadChildren: () => import('../modules/signup/signup.module').then(m => m.SignupModule) 
   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
