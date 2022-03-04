import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup/signup.component';
import { MaterialExampleModule } from 'src/material.module';
import { NgOtpInputModule } from  'ng-otp-input';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path:'',component: SignupComponent
}]

@NgModule({
  declarations: [
    SignupComponent
  ],
  imports: [
    CommonModule,
    NgOtpInputModule,
    RouterModule.forChild(routes),
    MaterialExampleModule
  ]
})
export class SignupModule { }
