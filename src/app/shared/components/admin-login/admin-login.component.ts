import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss'],
})
export class AdminLoginComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }



  
  logInForm = this.formBuilder.group({
    email: ['', [Validators.required,  Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
    password: ['', [Validators.required,Validators.minLength(5)]],
  });
 
  get email() {
    return this.logInForm.get('email');
  }

  get password() {
    return this.logInForm.get('password');
  }


  public errorMessages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' }
    ]
  }


  logIn(){
    this.authService.signIn(this.logInForm.get('email').value, this.logInForm.get('password').value);
  }
  ngOnInit() {}

}
