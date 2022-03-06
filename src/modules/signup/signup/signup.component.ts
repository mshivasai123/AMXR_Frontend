import { Component, OnInit } from '@angular/core';
import { SignupService } from './signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  numOrMail: any;
  constructor(
    public signupService : SignupService
  ) { }

  ngOnInit(): void {
  }

  submitEmailAndNum(){
    if(this.numOrMail){
      const data = {
        OTPType : /^\d+$/.test(this.numOrMail) ? 'Mobile' :'Email' ,
        EmailMobile : this.numOrMail
      }
      this.signupService.sendEmailAndNum(data).subscribe(res=>{
        if(res){
          console.log('res',res)
        }
      },err=>{
        this.signupService.openSnackBar('Something went wrong')
      })
    }
  }

  onOtpChange(event:any){

  }
}
