import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoadingService } from './services/loadingService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  subscriptions: Subscription = new Subscription();
  loading: {[key: string] : boolean | string} = {status: false, message: ''};

  constructor(private loadingService: LoadingService) {}

  ngOnInit() {
    this.subscriptions.add(this.loadingService.loadingStatusChanged.subscribe(status => {
      this.loading = status;
    }))
  }
}
