import { Component, OnInit, ViewChild } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap/modal";
import { NgForm } from "@angular/forms";

import { AccountService } from "src/app/services/accountService";
import { CuentasService } from "src/app/services/cuentas.service";
import { LoadingService } from "src/app/services/loading.service";
import { ModalService } from "src/app/services/modal.service";

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
    private accountApiService: CuentasService,
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
