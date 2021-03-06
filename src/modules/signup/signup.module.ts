import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup/signup.component';
import { MaterialExampleModule } from 'src/material.module';
import { NgOtpInputModule } from  'ng-otp-input';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LoaderComponent } from './signup/loader/loader.component';
import { CommonDialogueComponent } from './signup/common-dialogue/common-dialogue.component';

const routes: Routes = [{
  path:'',component: SignupComponent
}]

@NgModule({
  declarations: [
    SignupComponent,
    LoaderComponent,
    CommonDialogueComponent
  ],
  imports: [
    CommonModule,
    NgOtpInputModule,
    FormsModule,ReactiveFormsModule,
    RouterModule.forChild(routes),
    MaterialExampleModule
  ]
})
export class SignupModule { }
