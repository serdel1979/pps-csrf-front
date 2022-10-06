import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BanckService } from '../services/bank.service';
import { Transferencia } from './transfer.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor( private router: Router, private bankService: BanckService) { }


  transferencias!: Transferencia[];

  ngOnInit(): void {
    this.bankService.getTransferencias().subscribe(data=>{
      this.transferencias = data;
    })
  }

  logout() {
    this.bankService.logout();
    this.router.navigate(['/login']);
  }

}
