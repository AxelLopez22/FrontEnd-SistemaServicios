import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AgregarPago, Usuarios } from '../../models/models';
import { Observable, map, startWith } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ClienteServicesService } from '../../services/cliente-services.service';
import { PagoService } from '../../services/pago.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-pago',
  templateUrl: './add-pago.component.html',
  styleUrls: ['./add-pago.component.scss']
})
export class AddPagoComponent implements OnInit{

  loader = false;
  addPagoForm!: FormGroup;
  listUser: Usuarios[] = [];
  breakpoint!: number;
  filteredOptions!: Observable<Usuarios[]> | undefined;
  selectedClient: any;
  selectedValue!: string;
  selectedValuePlan!: string;
  selectedValueMonth!: string;
  selectedValuePlanId!: number;
  Meses: any[] = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']

  constructor(private fb:FormBuilder, private httpServiceCliente: ClienteServicesService, private httpServicePago:PagoService,
    private route: Router, private toastr: ToastrService){
    this.addPagoForm = fb.group({
      idCliente: new FormControl('', [Validators.required]),
      mesPago: new FormControl('', [Validators.required]),
      plan: new FormControl('', ),
      costo: new FormControl('',)
    });
  }

  ngOnInit(): void {
    this.breakpoint = (window.innerWidth <= 600) ? 2 : 6;

    this.filteredOptions = this.addPagoForm.get('idCliente')?.valueChanges.pipe(
      startWith(''),
      map(value => {
        const userName = typeof value === 'string' ? value : value?.userName;
        return userName ? this._filter(userName as string) : this.listUser.slice();
      }));

      this.getClientes();
  }

  getClientes(){
    this.httpServiceCliente.ListarClientes().subscribe((data: any) => {
      this.listUser = data.data;
    });
  }

  onSelection(event: MatAutocompleteSelectedEvent){
    this.selectedClient =  event.option.value;

    this.httpServiceCliente.GetPlanPayment(this.selectedClient.id).subscribe({
      next:(res: any) => {
        this.selectedValuePlanId = res.data.idClienteServicio
        this.selectedValue = res.data.precio;
        this.selectedValuePlan = res.data.descripcion
      },error:(err: any) => {
      },
    });
  }

  AgregarPago(){
    this.loader = true;
    let pago: AgregarPago = {
      total: parseFloat(this.selectedValue),
      mes: this.addPagoForm.get('mesPago')?.value,
      idClienteServicio: this.selectedValuePlanId
    }

    this.httpServicePago.AgregarPago(pago).subscribe({
      next:(res: any) => {
        this.showAlert(res.status, res.data);
        setTimeout(() => {
          this.loader = false;
          this.route.navigate(['admin/panel/pagos']);
        }, 1000);
      },
      error:(err: any) => {

      },
    });
  }

  private _filter(name: string): Usuarios[] {
    const filterValue = name.toLowerCase();
    return this.listUser.filter(option => option.cliente.toLowerCase().includes(filterValue));
  }

  onResize(event: any) {
    this.breakpoint = (event.target.innerWidth <= 600) ? 2 : 6;
  }

  displayFn(user: Usuarios): string {
    return user && user.cliente ? user.cliente : '';
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
