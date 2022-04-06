import { Component, OnInit } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap/modal";

@Component({
  selector: 'app-error',
  templateUrl: './error.html',
  styleUrls: []
})
export class ErrorModal implements OnInit {
  error;

  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit(): void {}
}
