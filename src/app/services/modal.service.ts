import { Injectable } from "@angular/core";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(private modalService: BsModalService) {}

  show(component, initialState?) {
    if (!initialState) {
      initialState = {};
    }

    this.modalService.show(component, initialState);
  }
}
