import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  constructor(
    private httpClient: HttpClient,
    private _snackBar: MatSnackBar
  ) { }
  
  sendEmailAndNum(data:any) : Observable<any>{
    const api =  'api/pre-subscribers/add'
    // const fData: FormData = new FormData;
    // fData.append("OTPType", data.OTPType);
    // fData.append("EmailMobile", data.EmailMobile);
    return this.httpClient.post(api, data);
  }

  verifyOtp(data : any): Observable<any>{
    // const fData: FormData = new FormData;
    // fData.append("OTPType", data.OTPType);
    // fData.append("EmailMobile", data.EmailMobile);
    // fData.append('OTPID',data.OTPID)
    // fData.append('OTP',data.OTP)
   const api = '/api//pre-subscribers/verify'
   return this.httpClient.post(api, data);
  }

  openSnackBar(data:string) {
    this._snackBar.open(data, 'x', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 3000
    });
  }
}
