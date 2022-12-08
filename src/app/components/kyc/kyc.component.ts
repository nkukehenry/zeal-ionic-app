import { ModalController, NavController } from '@ionic/angular';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PricesService } from 'src/app/services/prices.service';
import { DataService } from 'src/app/services/data.service';
import { BaseService } from 'src/app/services/base.service';

@Component({
  selector: 'app-kyc',
  templateUrl: './kyc.component.html',
  styleUrls: ['./kyc.component.scss'],
})

export class KycComponent implements OnInit {

  user:any;
  imageUrl:string;

  constructor(
    private modal:ModalController,
    private dataService: DataService,
    private apiService:BaseService ) {

      
    this.imageUrl = this.apiService.baseUrl


     }


  ngOnInit() {

    this.user = this.dataService.user;

    console.log( this.user);

  }

  
  closeModal() {
    this.modal.dismiss();
  }

  
}
