import { Injectable, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { LoadingService } from "./loading.service";
import { MovimientosService } from "./movimientos.service";

@Injectable({
  providedIn: 'root'
})
export class MovementService implements OnInit {
  movementAdded: Subject<{}> = new Subject();

  constructor(private movementApiService: MovimientosService, private loadingService: LoadingService) {}

  ngOnInit(): void {

  }

  addMovement(movement, cuenta: number) {
    this.loadingService.setLoading();
    this.movementApiService.createNewMovement(movement, cuenta).subscribe(data => {
      this.loadingService.dismissLoading();
      console.log(data);
      this.movementAdded.next(data.movimientoNuevo);
    }, error => {
      console.log(error);
    });
  }
}
