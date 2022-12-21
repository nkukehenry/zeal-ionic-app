import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Database } from '@ionic/storage';

@Component({
  selector: 'app-country-select',
  templateUrl: './country-select.component.html',
  styleUrls: ['./country-select.component.scss'],
})
export class CountrySelectComponent implements OnInit {

  countrys:any = [];
  filtered     = [];
  searchkey    = "";

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {

    this.countrys = this.countrys.filter( (item:any)=>parseInt(item.quote_currency.country.allow_remittances)==1)
   
  }

  closeModal(data:any){
    this.modalCtrl.dismiss({
      'dismissed': true,
      'data':data
    });
  }

checkKey(){
    let key = this.searchkey;
    
    if(key.length === 0){
        this.filtered =[];
        return;
      }

    this.filtered = this.countrys.filter(function (el:any) {
        return ( (el.name.toLowerCase().indexOf(key.toLowerCase())>-1))
           
      });
  }


}
