import { Component, OnInit, SimpleChange } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriasService } from 'src/app/services/categorias.service';
import { CuentasService } from 'src/app/services/cuentas.service';
import { MovimientosService } from 'src/app/services/movimientos.service';

import { Accounts } from '../../cuenta.model';
import { Movements } from './movimiento.model';

@Component({
  selector: 'app-nuevo-movimiento',
  templateUrl: './nuevo-movimiento.component.html',
  styleUrls: ['./nuevo-movimiento.component.css'],
})
export class NuevoMovimientoComponent implements OnInit {
  addMovement!: FormGroup;
  cuentas!: [Accounts];
  categorias!: [{ id: number; nombre: string }];
  error: { message: string; error: boolean } = { message: '', error: false };

  constructor(
    private cuentasService: CuentasService,
    private categoriasService: CategoriasService,
    private movimientosService: MovimientosService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.addMovement = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      id_categoria: new FormControl(null, [Validators.required]),
      monto: new FormControl('', [Validators.required]),
      id_tipo_mov: new FormControl('', [Validators.required]),
      fecha: new FormControl('', [Validators.required]),
    });

    this.addMovement.get('id_tipo_mov')?.valueChanges.subscribe((data) => {
      if (data === '3') {
        this.addMovement.addControl(
          'id_cuenta_destino',
          new FormControl('', [Validators.required])
        );

        this.cuentasService.getAccounts().subscribe((cuentas) => {
          this.cuentas = cuentas.cuentas;
        });
      }
    });

    this.addMovement.get('id_tipo_mov')?.valueChanges.subscribe((data) => {
      if (data === '1') {
        this.categoriasService.getCategorias(+data).subscribe((data) => {
          console.log(data);
          this.categorias = data.categorias;
        });
      }
    });

    this.addMovement.get('id_tipo_mov')?.valueChanges.subscribe((data) => {
      if (data === '2') {
        this.categoriasService.getCategorias(+data).subscribe((data) => {
          this.categorias = data.categorias;
        });
      }
    });
  }

  onSubmit() {
    this.addMovement.value.id_categoria = +this.addMovement.value.id_categoria;
    this.addMovement.value.id_tipo_mov = +this.addMovement.value.id_tipo_mov;
    this.addMovement.value.monto = +this.addMovement.value.monto;
    this.addMovement.value.fecha = this.formatDateBeforeSave(
      this.addMovement.value.fecha
    );

    console.log(this.addMovement.value);

    this.movimientosService
      .createNewMovement(this.addMovement.value, +this.route.snapshot.params.id)
      .subscribe(
        (data) => {
          this.formatearFecha(data.movimientoNuevo);
          this.movimientosService.nuevoMovimiento$.next(data.movimientoNuevo);
          this.router.navigate(['../..'], { relativeTo: this.route });
        },
        (error) => {
          this.error.message = error.error.message;
          this.error.error = true;
        }
      );
  }

  private formatearFecha(movimientoNuevo: Movements) {
    const fechaFormateada = new Date(movimientoNuevo.fecha);
    movimientoNuevo.fecha = fechaFormateada.toLocaleDateString('es');
  }

  private formatDateBeforeSave(fecha: string) {
    let fechaFormateada = new Date(fecha);
    // fecha = fechaFormateada.toISOString();
    console.log(fechaFormateada);
    return fecha;
  }
}
