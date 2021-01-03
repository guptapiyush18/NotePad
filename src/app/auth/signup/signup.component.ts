import { Component, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  NgForm,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(
    private snackBar: MatSnackBar,
    private route: Router,
    private authService: AuthService
  ) {}
  @ViewChild('signUpFormDirective') sForm: NgForm;

  signUpForm: FormGroup;

  ngOnInit(): void {
    this.signUpForm = new FormGroup(
      {
        userId: new FormControl(null, [
          Validators.required,
          Validators.minLength(6),
          this.checkUserValid,
        ]),
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [
          Validators.minLength(6),
          Validators.required,
        ]),
        confirmpassword: new FormControl(null),
      },
      { validators: this.checkPassWord }
    );
  }
  checkUserValid(control: AbstractControl): { [key: string]: boolean } | null {
    const userId: string = control.value;
    if (userId && userId.includes(' ')) {
      return { userInvalid: true };
    }
    return null;
  }
  checkPassWord: ValidatorFn = (
    control: FormGroup
  ): ValidationErrors | null => {
    const pass = control.get('password');
    const cpass = control.get('confirmpassword');
    return pass && cpass && pass.value === cpass.value
      ? null
      : { checkPassword: true };
  };

  OnSignUp() {
    this.authService.signUp(this.signUpForm.value.userId,this.signUpForm.value.email,this.signUpForm.value.password);
    this.signUpForm.reset();
    this.sForm.resetForm();
    this.route.navigate(['/']);
    this.snackBar.open('User Signed Up Successfully. Please Login', 'X', {
      duration: 2000,
    });
  }
}
