import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthApiService } from 'src/app/services/api-services/AuthApiService';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  user: string | null = '';

  constructor(private authApiService: AuthApiService, private router: Router) {}

  ngOnInit(): void {
    this.user = localStorage.getItem('user');
  }

  onLogout() {
    this.authApiService.logout();
    this.router.navigateByUrl('/login');
  }
}
