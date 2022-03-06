import { Component, OnInit } from '@angular/core';
import { SignupService } from './signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  showLoader:boolean = false;
  numOrMail: any;
  constructor(
    public signupService : SignupService
  ) { }

  ngOnInit(): void {
  }

  submitEmailAndNum(){
    if(this.numOrMail){
      this.showLoader = true
      const data = {
        OTPType : /^\d+$/.test(this.numOrMail) ? 'Mobile' :'Email' ,
        EmailMobile : this.numOrMail
      }
      this.signupService.sendEmailAndNum(data).subscribe(res=>{
        if(res){
          this.showLoader = false;
          console.log('res',res)
        }
      },err=>{
        this.signupService.openSnackBar('Something went wrong')
        this.showLoader = false;
      })
    }
  }

  onOtpChange(event:any){

  }
}
