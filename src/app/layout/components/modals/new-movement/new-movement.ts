import { Component,  OnInit, ViewChild} from "@angular/core";
import { NgForm } from "@angular/forms"

import { BsModalRef } from "ngx-bootstrap/modal";

import { AccountService } from "src/app/services/accountService";
import { CategoryApiService } from "src/app/services/api/categoryApiService";
import { CategoryService } from "src/app/services/categoryService";
import { MovementService } from "src/app/services/api/movementService";

import { Accounts } from "../../../../models/account.model";

@Component({
  selector: 'app-new-movement',
  templateUrl: './new-movement.html',
  styleUrls: []
})
export class NewMovementModal implements OnInit {
  @ViewChild('newMovementForm') movementForm: NgForm;

  movementType;
  accounts: Accounts[];
  activeAccount: Accounts;
  categories = [];
  categoriesToShow = [];
  sameAccount: boolean = false;
  currentDate: Date = new Date(Date.now());

  constructor(
    public bsModalRef: BsModalRef,
    private accountService: AccountService,
    private categoryService: CategoryService,
    private categoryApiService: CategoryApiService,
    private movementService: MovementService,
  ) {
    // @ts-ignore
    window.NewMovementComponent = this;
  }

  ngOnInit() {
    this.accounts = this.accountService.getAccounts();
    this.activeAccount = this.accountService.getActiveAccount();
    this.getCategories();

    this.movementService.movementAdded.subscribe(() => {
      this.bsModalRef.hide();
    });
  }

  getCategories() {
    this.categoryApiService.getCategories().subscribe(data => {
      this.categories = data.categories;
      this.categoryService.setCategories(this.categories);
      this.setCategories();
    });
  }

  checkAccounts(e) {
    if (+e.target.value === this.activeAccount.id) {
      this.sameAccount = true;
    } else {
      this.sameAccount = false;
    }
  }

  onAddNewMovement() {
    if (!this.movementForm.valid) return;

    const { name, amount, date, category, subCategory } = this.movementForm.value;

    const movement = {
      nombre: name,
      monto: amount,
      fecha: date,
      id_categoria: category,
      id_subcategoria: subCategory,
      id_tipo_mov: this.movementType.id
    }

    if (this.movementType.name === "transfer") {
      movement["id_cuenta_destino"] = this.movementForm.value.destinationAccount;
    }

    this.movementService.addMovement(movement, this.activeAccount.id);
  }

  setCategories() {
    this.categoriesToShow = this.categories.filter(category => {
      return (category.tipo_movimiento.nombre === this.movementType.name);
    })
  }
}
