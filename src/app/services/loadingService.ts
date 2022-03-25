import { Injectable, OnInit } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class LoadingService implements OnInit {
  loadingStatusChanged: Subject<{}> = new Subject();
  loadingData: {};

  constructor() {}

  ngOnInit(): void {}

  setLoading(message?) {
    this.loadingData = {status: true, message: message};
    this.loadingStatusChanged.next(this.loadingData);
  }

  dismissLoading(message?) {
    this.loadingData = {status: false, message: message}
    this.loadingStatusChanged.next(this.loadingData)
  }
}
