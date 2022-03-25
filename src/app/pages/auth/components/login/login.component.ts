import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { AuthApiService } from 'src/app/services/api-services/AuthApiService';
import { LoadingService } from 'src/app/services/loadingService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  error: boolean = false;
  errorMessage: string = '';

  @ViewChild('loginForm') loginForm: NgForm;

  constructor(private authApiService: AuthApiService, private router: Router, private loadingService: LoadingService) {}

  ngOnInit(): void {}

  onSubmit() {
    if (!this.loginForm.valid) {
      return;
    }
    this.loadingService.setLoading();
    this.authApiService.login(this.loginForm.value).subscribe(
      (data) => {
        this.loadingService.dismissLoading();
        localStorage.setItem('token', data.user.token);
        this.authApiService.setUserInfo(data.user);
        this.loginForm.reset();
        this.router.navigateByUrl('/app');
      },
      (error) => {
        this.error = true;
        this.errorMessage = error.error.message;
      }
    );
  }

  onLogout() {
    this.authApiService.logout();
  }
}
