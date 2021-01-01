import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, NgForm, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import  { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(private snackBar: MatSnackBar,private route: Router) {}
  @ViewChild('signUpFormDirective') sForm: NgForm;

  signUpForm: FormGroup;

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.minLength(6),
        Validators.required,
      ]),
      confirmpassword: new FormControl(null, [
        Validators.minLength(6),
        Validators.required,
      ]),
    },{validators: this.checkPassWord});

  }
  checkPassWord: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const pass = control.get('pass');
  const cpass = control.get('confirmpassword');

  return pass && cpass && pass.value !== cpass.value ? { checkPassword: true } : null;
};

  OnSignUp() {
    this.signUpForm.reset();
    this.sForm.resetForm();
    this.route.navigate(['/'])
    this.snackBar.open('User Signed Up Successfully. Please Login', 'X', {
      duration: 2000,
    });
  }
}
