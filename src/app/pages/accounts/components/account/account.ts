import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AccountApiService } from 'src/app/services/api-services/accountApiService';

import { Accounts } from '../../../../../models/cuenta.model';

@Component({
  selector: 'app-account',
  templateUrl: './account.html',
  styleUrls: ['./account.css'],
})
export class AccountComponent implements OnInit {
  accounts!: [Accounts];

  constructor(private accountApiService: AccountApiService, private router: Router) {}

  ngOnInit(): void {
  }
}
