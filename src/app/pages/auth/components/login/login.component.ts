import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { LoadingService } from 'src/app/services/loading.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  error: boolean = false;
  errorMessage: string = '';

  @ViewChild('loginForm') loginForm: NgForm;

  constructor(private authService: AuthService, private router: Router, private loadingService: LoadingService) {}

  ngOnInit(): void {}

  onSubmit() {
    if (!this.loginForm.valid) {
      return;
    }
    this.loadingService.setLoading();
    this.authService.login(this.loginForm.value).subscribe(
      (data) => {
        this.loadingService.dismissLoading();
        localStorage.setItem('token', data.user.token);
        this.authService.setUserInfo(data.user);
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
    this.authService.logout();
  }
}
