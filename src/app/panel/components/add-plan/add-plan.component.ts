import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrearPlan, categoriaServicios } from '../../models/models';
import { ServicesService } from '../../services/services.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-plan',
  templateUrl: './add-plan.component.html',
  styleUrls: ['./add-plan.component.scss']
})
export class AddPlanComponent implements OnInit {
  loader = false;
  breakpoint!: number;
  planForm!: FormGroup;
  selectedValue!: string;
  categoriaServicios: categoriaServicios[] = []

  constructor(private fb:FormBuilder, private httpService: ServicesService, private toastr: ToastrService, private route: Router){
    this.planForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', [Validators.required, Validators.maxLength(100)]],
      precio: [0, Validators.required],
      idServicio: [0, Validators.required]
    });
  }

  ngOnInit(): void {
    this.ListarCategorias();
    this.breakpoint = (window.innerWidth <= 600) ? 3 : 6;
  }

  onResize(event: any) {
    this.breakpoint = (event.target.innerWidth <= 600) ? 2 : 6;
  }

  ListarCategorias(){
    this.httpService.ListarCategorias().subscribe({
      next:(res:any) => {
        this.categoriaServicios = res.data;
      },error:(err:any) => {
        console.log(err);
      },
    });
  }

  CrearPlan(){
    this.loader = true;

    let plan: CrearPlan = {
      nombre: this.planForm.get('nombre')?.value,
      descripcion: this.planForm.get('descripcion')?.value,
      precio: this.planForm.get('precio')?.value,
      idServicio: parseInt(this.selectedValue)
    }

    this.httpService.CrearPlan(plan).subscribe({
      next:(res: any) => {
        this.showAlert(res.status, res.data);
        setTimeout(() => {
          this.loader = false;
          this.route.navigate(['admin/panel/servicios']);
        }, 1000);
      },error:(err: any) => {
        const {status, data} = err.error;
        this.showAlert(status, data)
        setTimeout(() => {
          this.loader = false;
        }, 1000);
      },
    });
  }

  showAlert(status: string, mensaje: string){
    status === "Ok" ? this.toastr.success(`${mensaje}`, "", {
      timeOut: 2000,
      closeButton: true,
      progressBar: true,
      progressAnimation: 'decreasing',
      easing: 'ease-in',
      easeTime: 300
    }) : this.toastr.error(`${mensaje}`, "", {
      timeOut: 2000,
      closeButton: true,
      progressBar: true,
      progressAnimation: 'decreasing',
      easing: 'ease-in',
      easeTime: 300
    })
  }
}
