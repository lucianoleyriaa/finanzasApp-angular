import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthApiService } from 'src/app/services/api-services/AuthApiService';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(private router: Router, private authApiService: AuthApiService) {}

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      apellido: new FormControl('', [Validators.required]),
      nombreUsuario: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onSignup() {
    console.log(this.signupForm.value);
    this.authApiService.signup(this.signupForm.value).subscribe(
      (data) => {
        this.router.navigateByUrl('/cuentas');
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
