import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PricesService {

  constructor() { }

  calculateEquivalent(priceBooked:number,amount:number,isSelling:boolean){

    console.log('price',priceBooked);
    console.log('amount',amount);
    console.log('isSelling',isSelling);

    if(isSelling){
      return priceBooked * amount;
    }
    else{
      return  amount/priceBooked;
    }

  }


getEquivalentLabel(exchangePair:any,isSelling:Boolean,returnCode:Boolean){
  if(returnCode){
    return (isSelling)?exchangePair.base_currency.code:exchangePair.quote_currency.code;
  }else{
    return (isSelling)?exchangePair.base_currency.symbol:exchangePair.quote_currency.symbol;
  }
}

getBaseLabel(exchangePair:any,isSelling:Boolean,returnCode:Boolean){

  if(returnCode){
     return (isSelling)?exchangePair.quote_currency.code:exchangePair.base_currency.code;
  }
   else{
    return (isSelling)?exchangePair.quote_currency.symbol:exchangePair.base_currency.symbol;
   }
}

}
