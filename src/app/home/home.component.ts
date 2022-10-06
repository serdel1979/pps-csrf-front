import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BanckService } from '../services/bank.service';
import { Transferencia } from './transfer.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  transferencias!: Transferencia[];
  transferForm: FormGroup;
  submitted = false;
  nuevatr: boolean = false;
  estado: string="Nueva";

  constructor(private formBuilder: FormBuilder, private router: Router, private bankService: BanckService) {
    this.transferForm = this.formBuilder.group(
      {
        destinatario: ["", [Validators.required]],
        monto: ["", [Validators.required]]
      }
    );
  }




  ngOnInit(): void {
    this.cargar();
  }

  cargar(){
    this.bankService.getTransferencias().subscribe(data => {
      this.transferencias = data;
    })
  }

  get form() {
    return this.transferForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.transferForm.invalid) {
      return;
    }
    this.bankService.transferir(this.transferForm.value)
      .subscribe(() => {
        this.cargar();
      }, (err: any) => {
        alert(`Error ${err.message}`);
      });

  }



  toggle() {
    if(this.nuevatr){
      this.nuevatr = false;
      this.estado = "Nueva";
    }else{
      this.nuevatr = true;
      this.estado = "Cancelar";
      this.transferForm.reset();
    }
    
  }

  logout() {
    this.bankService.logout();
    this.router.navigate(['/login']);
  }

}
