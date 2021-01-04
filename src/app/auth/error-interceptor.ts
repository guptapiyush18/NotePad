import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
} from "@angular/common/http";
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { ErrorsComponent } from "../errors/errors.component";
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private matDialog: MatDialog) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) =>{
        let errorMessage = error.error?.message;
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = errorMessage;
        dialogConfig.height = "200px";
        dialogConfig.width = "400px"
        this.matDialog.open(ErrorsComponent, dialogConfig);

        return throwError(error);
      })
    );
    // if (!errorRes.error || !errorRes.error.error) {
    //   return throwError(errorMessage);
    // }
    // switch (errorRes.error.error.message) {
    //   case 'EMAIL_EXISTS':
    //     errorMessage = 'This email exists already';
    //     break;
    //   case 'EMAIL_NOT_FOUND':
    //     errorMessage = 'This email does not exist.';
    //     break;
    //   case 'INVALID_PASSWORD':
    //     errorMessage = 'This password is not correct.';
    //     break;
    // }
  }
}
