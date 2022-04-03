import { Component, OnInit, ViewChild } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap/modal";
import { NgForm } from "@angular/forms";

import { AccountService } from "src/app/services/accountService";
import { AccountApiService } from "src/app/services/api/accountApiService";
import { LoadingService } from "src/app/services/loadingService";
import { ModalService } from "src/app/services/modalService";

import { ErrorModal } from "../error/error";

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.html',
  styleUrls: []
})
export class NewAccountModal implements OnInit {
  @ViewChild('newAccountForm') newAccountForm: NgForm;

  constructor(
    public bsModalRef: BsModalRef,
    private accountApiService: AccountApiService,
    private loadingService: LoadingService,
    private accountService: AccountService,
    private modalService: ModalService,
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    if (!this.newAccountForm.valid) return;

    this.loadingService.setLoading();
    this.accountApiService.createAccount(this.newAccountForm.value).subscribe(data => {
      this.loadingService.dismissLoading();
      this.bsModalRef.hide();
      this.accountService.addAccount(data.newAccount);
    }, error => {
      this.loadingService.dismissLoading();
      this.bsModalRef.hide();
      this.modalService.show(ErrorModal, {
        class: 'modal-sm modal-dialog modal-dialog-centered',
        initialState: {error: error.error}
      });

    })
  }
}
