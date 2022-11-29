import { Component, Input, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-currencypair',
  templateUrl: './currencypair.component.html',
  styleUrls: ['./currencypair.component.scss'],
})
export class CurrencypairComponent implements OnInit {

  @Input('currencyPair') currencyPair:any;
  
  constructor(private router:Router,private dataService:DataService) { }

  ngOnInit() {}

  startExchange(link:any,isSelling:Boolean) {

    this.currencyPair.isSelling   = isSelling;
    this.dataService.exchangePair = this.currencyPair;

    this.router.navigate([link]);
  }

}
