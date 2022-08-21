import { Injectable, OnInit } from "@angular/core";

import { Subject } from "rxjs";

import { MovementApiService } from "../movementApiService";
import { LoadingService } from "../loadingService";
import { Movement } from "src/app/models/movement.model";

@Injectable({
  providedIn: 'root'
})
export class MovementService implements OnInit {
    movementAdded: Subject<{}> = new Subject();
    movementUpdated: Subject<any> = new Subject();

    constructor(private movementApiService: MovementApiService, private loadingService: LoadingService) {}

    ngOnInit(): void {

    }

    addMovement(movement, cuenta: number) {
        this.loadingService.setLoading();
        this.movementApiService.createNewMovement(movement, cuenta).subscribe(data => {
            this.loadingService.dismissLoading();
            this.movementAdded.next(data.movement);
        }, error => {
            this.loadingService.dismissLoading();
            console.log(error);
        });
    }

    updateMovement(movement, movement_id: number, account: number) {
        this.loadingService.setLoading();
        this.movementApiService.updateMovement(movement, movement_id, account).subscribe(data => {
            this.loadingService.dismissLoading();
            console.log(movement);
            if (data.status === "OK") {
                this.movementUpdated.next(movement);
            }
        }, (error) => {
            this.loadingService.dismissLoading();
            console.log(error);
        });
    }
}
