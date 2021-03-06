import { Component, OnInit, Inject} from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CommonDialogueComponent } from './common-dialogue/common-dialogue.component';
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
  name:string = ""
  constructor(
    public signupService : SignupService,private dialog: MatDialog, public router:Router
  ) { }

  ngOnInit(): void {
    console.log(this.router.url,"url")
    if(this.router.url.includes('aboutAcinemas')){
      this.openModal('aboutAcinemas')
    }else if(this.router.url.includes('termsOfUse')){
      this.openModal('termsOfUse')
    }else if(this.router.url.includes('privacypolicies')){
      this.openModal('privacypolicies')
    }else if(this.router.url.includes('contact')){
      this.openModal('contact')
    }
    
  }

  openModal(title:any){
    const dialogRef = this.dialog.open(CommonDialogueComponent, {
      data : {title : title}
    })

    dialogRef.afterClosed().subscribe((load) => {
      if (load) {
       
      }
    });
  }
  submitEmailORNum(val:any){
    if(!(/^(?:\d{10}|\w+@\w+\.\w{2,3})$/.test(val))){
      this.signupService.openSnackBar('Please enter a valid phone number or email')
      return
    }
    this.submitEmailAndNum()
  }

  submitEmailAndNum(){
    this.time = 60;
    this.startTimer();
    if(this.numOrMail){
      this.showLoader = true
      this.OTPType = /^\d+$/.test(this.numOrMail) ? 'mobile' :'email';
      const data:any = {
        otpType : this.OTPType ,
        name: this.name
      }
      if(this.OTPType == 'email'){
        data['email'] =  this.numOrMail
      }else {
        data['mobile'] = this.numOrMail
      }
      this.signupService.sendEmailAndNum(data).subscribe(res=>{
        if(res){
          if(res.success){
            this.showLoader = false;
            console.log('res',res)
            this.OTPID = res.data.id
            this.registerPage = false;
            this.validOtpPage = true;
          } else {
            console.log(res,"res")
            this.signupService.openSnackBar(res)
            this.showLoader = false;
          }
        }
      },err=>{
        console.log(err,"err")
        if(err?.error?.errors?.length && err?.error?.errors[0]?.text){
          this.signupService.openSnackBar(err?.error?.errors[0]?.text)
        }else {
          this.signupService.openSnackBar('Something went wrong')
        }
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
      const data:any = {
        otpType : this.OTPType,
        otpData : this.OTP,
      }
      if(this.OTPType == 'email'){
        data['email'] =  this.numOrMail
      }else {
        data['mobile'] = this.numOrMail
      }
      this.signupService.verifyOtp(data).subscribe(res=>{
        if(res){
          if(res.success){
            this.showLoader = false;
            this.validOtpPage = false;
            this.successOtp = true;
          } else {
            this.signupService.openSnackBar(res)
            this.showLoader = false;
          }
        }
      },err=>{
        this.showLoader = false;
        if(err?.error?.data){
          this.signupService.openSnackBar(err?.error?.data)
        }else {
          this.signupService.openSnackBar('Something went wrong')
        }
      })
    }
  }

  onOtpChange(event:any){
   this.OTP = event
  }
}