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
  OTPType!: string;
  registerPage = true;
  validOtpPage = false;
  successOtp = false;
  play! : boolean;
  resendOtp = false;
  EmailMobile: any;
  OTPID : any;
  OTP: any;
  time: number = 60;
  interval: any;

  constructor(
    public signupService : SignupService
  ) { }

  ngOnInit(): void {
  }

  submitEmailAndNum(){
    this.time = 60;
    this.startTimer();
    if(this.numOrMail){
      this.showLoader = true
      this.OTPType = /^\d+$/.test(this.numOrMail) ? 'Mobile' :'Email';
      const data = {
        OTPType : this.OTPType ,
        EmailMobile : this.numOrMail
      }
      this.signupService.sendEmailAndNum(data).subscribe(res=>{
        if(res){
          if(res.Result === 'SUCCESS'){
            this.showLoader = false;
            console.log('res',res)
            this.OTPID = res.OTPID
            this.registerPage = false;
            this.validOtpPage = true;
          } else {
            this.signupService.openSnackBar(res.Result)
            this.showLoader = false;
          }
        }
      },err=>{
        this.signupService.openSnackBar('Something went wrong')
        this.showLoader = false;
      })
    }
  }

  startTimer() {
    const timmer = setInterval(()=>{
       this.time--
      if(this.time === 0){ 
        this.resendOtp = true;
        clearInterval(timmer)
      }
    },1000);
  }



  validOtpForm(){
    if(this.numOrMail){
      this.showLoader = true
      const data = {
        OTPType : this.OTPType,
        EmailMobile : this.numOrMail,
        OTPID : this.OTPID,
        OTP : this.OTP,
      }
      this.signupService.verifyOtp(data).subscribe(res=>{
        if(res){
          if(res.Result === 'SUCCESS'){
            this.showLoader = false;
            this.validOtpPage = false;
            this.successOtp = true;
          } else {
            this.signupService.openSnackBar(res.Result)
            this.showLoader = false;
          }
        }
      },err=>{
        this.showLoader = false;
        this.signupService.openSnackBar('Something went wrong')
      })
    }
  }

  onOtpChange(event:any){
   this.OTP = event
  }
}