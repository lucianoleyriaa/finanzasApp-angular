import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AccountApiService } from 'src/app/services/api-services/accountApiService';

import { Accounts } from '../../pages/accounts/components/cuenta.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  accounts!: [Accounts];

  constructor(private accountApiService: AccountApiService, private router: Router) {}

  ngOnInit(): void {}
}
