import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  error: boolean = false;
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      nombreUsuario: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    this.error = false;
    this.authService.login(this.loginForm.value).subscribe(
      (data) => {
        localStorage.setItem('token', data.user.token);
        this.authService.setUserInfo(data.user);
        this.loginForm.reset();
        this.router.navigateByUrl('/dashboard');
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
