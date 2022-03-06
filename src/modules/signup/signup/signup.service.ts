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
    const api = 'https://www.acinemas.com/ACAPIS/OTP.php'
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
