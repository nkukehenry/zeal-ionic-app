import { ModalController, NavController } from '@ionic/angular';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PricesService } from 'src/app/services/prices.service';

@Component({
  selector: 'app-trandetail',
  templateUrl: './trandetail.component.html',
  styleUrls: ['./trandetail.component.scss'],
})

export class TranDetailComponent implements OnInit {

  transaction:any;

  constructor(private modal:ModalController,private pricesService: PricesService) { }


  ngOnInit() {

    console.log(this.transaction)

  }

  calculateEquivalent(){

    let pair      = this.transaction.currency_pair;
    let amount    = parseFloat(this.transaction.base_amount);
    let isSelling = (parseInt(this.transaction.is_buy)==0);
    let price    = parseFloat(this.transaction.price_booked);

    let equivalent = this.pricesService.calculateEquivalent(price,amount,isSelling);

    console.log(equivalent);

    return equivalent;

  }

  getEquivalentLabel(returnCode=false){

    let pair      = this.transaction.currency_pair;
    let isSelling = (parseInt(this.transaction.is_buy)==0);

    let currency_symbol = this.pricesService.getEquivalentLabel(pair,isSelling,returnCode);

    return currency_symbol;
  }

  getBaseLabel(returnCode=false){

    let pair      = this.transaction.currency_pair;
    let isSelling = (parseInt(this.transaction.is_buy)==0);

    let currency_symbol = this.pricesService.getBaseLabel(pair,isSelling,returnCode);

    return currency_symbol;
  }

  
  closeModal() {
    this.modal.dismiss();
  }

  
}
