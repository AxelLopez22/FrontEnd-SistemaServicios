import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServicesService } from '../../services/services.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { EditarPlan, categoriaServicios } from '../../models/models';

@Component({
  selector: 'app-edit-plan',
  templateUrl: './edit-plan.component.html',
  styleUrls: ['./edit-plan.component.scss']
})
export class EditPlanComponent implements OnInit {
  loader = false;
  breakpoint!: number;
  idPlan!: number;
  editplanForm!: FormGroup;
  selectedValue!: string;
  categoriaServicios: categoriaServicios[] = []

  constructor(private fb:FormBuilder, private httpService: ServicesService, private toastr: ToastrService, private route: Router,
    private params: ActivatedRoute){
    this.editplanForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', [Validators.required, Validators.maxLength(100)]],
      precio: [0, Validators.required]
    });
  }

  ngOnInit(): void {
    this.ListarCategorias();
    const {id} = this.params.snapshot.params;
    this.idPlan = id;
    this.GetPlanById();
    this.breakpoint = (window.innerWidth <= 600) ? 3 : 6;
  }

  GetPlanById(){
    this.httpService.GetPlanById(this.idPlan).subscribe({
      next:(res: any) => {
        this.editplanForm.get('nombre')?.setValue(res.data.nombre);
        this.editplanForm.get('descripcion')?.setValue(res.data.descripcion);
        this.editplanForm.get('precio')?.setValue(res.data.precio);
      },error:(err:any) => {

      },
    });
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


  EditarPlan(){
    this.loader = true;

    let plan: EditarPlan = {
      nombre: this.editplanForm.get('nombre')?.value,
      descripcion: this.editplanForm.get('descripcion')?.value,
      precio: this.editplanForm.get('precio')?.value
    }

    this.httpService.EditarPlan(this.idPlan, plan).subscribe({
      next:(res: any) => {
        this.showAlert(res.status, res.data);
        setTimeout(() => {
          this.loader = false;
          this.route.navigate(['admin/panel/servicios']);
        }, 1000);
      },
      error:(err: any) => {

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
