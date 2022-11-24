import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-currencypair',
  templateUrl: './currencypair.component.html',
  styleUrls: ['./currencypair.component.scss'],
})
export class CurrencypairComponent implements OnInit {

  @Input('currencyPair') currencyPair:any;
  
  constructor() { }

  ngOnInit() {}

}
