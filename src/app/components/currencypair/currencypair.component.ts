import { Component, Input, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-currencypair',
  templateUrl: './currencypair.component.html',
  styleUrls: ['./currencypair.component.scss'],
})
export class CurrencypairComponent implements OnInit {

  @Input('currencyPair') currencyPair:any;
  
  constructor(private router:Router,private dataService:DataService,private uiService:UiService) { }

  ngOnInit() {

  
  }

  startExchange(link:any,isSelling:Boolean) {

    console.log(this.dataService.user);

    if(parseInt(this.dataService.user.client_kyc.is_complete)==0){
      this.uiService.showAlert("You need to complete your profile KYC first!");
      return;
    }

    this.currencyPair.isSelling   = isSelling;
    this.dataService.exchangePair = this.currencyPair;

    this.router.navigate([link]);
  }

}
