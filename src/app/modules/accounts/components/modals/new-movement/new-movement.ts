import { Component,  OnInit, ViewChild} from "@angular/core";
import { NgForm } from "@angular/forms"

import { BsModalRef } from "ngx-bootstrap/modal";
import * as moment from "moment";

import { AccountService } from "src/app/services/accountService";
import { CategoryApiService } from "src/app/services/api/categoryApiService";
import { CategoryService } from "src/app/services/categoryService";
import { MovementService } from "src/app/services/api/movementService";

import { Accounts } from "src/app/models/account.model";
import { Movement } from "src/app/models/movement.model";

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
  movement: Movement = {
      name: '',
      amount: undefined,
      date: moment().format('YYYY-MM-DD'),
      id: undefined,
      category: { id: undefined, name: '' },
      type: { id: undefined, name: '' }
  }
  categories = [];
  categoriesToShow = [];
  sameAccount: boolean = false;
  currentDate: Date = new Date(Date.now());
  mode: string = 'create';

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
    // this.movementService.getMovement()

    this.movementService.movementAdded.subscribe(() => {
      this.bsModalRef.hide();
    });

    this.movementService.movementUpdated.subscribe(() => {
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

    // const movement = {
    //   name: name,
    //   amount: amount,
    //   date: this.createDatetime(date),
    //   category_id: category,
    //   subCategory_id: subCategory,
    //   id_mov_type: this.movementType.id
    // }

    const movement: Movement = {
        id: this.movement.id,
        date: date,
        name: name,
        type: {
            id: this.movementType.id,
            name: this.movementType.name,
        },
        category: {
            id: this.movement.category.id,
            name: this.movement.category.name
        },
        amount: amount,
    }

    if (this.movementType.name === "transfer") {
      movement["id_cuenta_destino"] = this.movementForm.value.destinationAccount;
    }

    if (this.mode === 'edit') {
        return this.movementService.updateMovement(movement, this.movement.id, this.activeAccount.id);
    }

    this.movementService.addMovement(movement, this.activeAccount.id);
  }

  setCategories() {
    this.categoriesToShow = this.categories.filter(category => {
      return (category.tipo_movimiento.nombre === this.movementType.name);
    })
  }

    onChange(e) {
        const now = new Date();

        const date = moment(e.target.value);
        date.hours(now.getHours());
        date.minutes(now.getMinutes());
        date.milliseconds(now.getMilliseconds());

        this.movement.date = date.format('YYYY-MM-DD');
    }

    private createDatetime(date: string) {
        const now = new Date();

        const datetime = moment(date);
        datetime.hours(now.getHours());
        datetime.minutes(now.getMinutes());
        datetime.milliseconds(now.getMilliseconds());

        return datetime.toDate();
    }
}
