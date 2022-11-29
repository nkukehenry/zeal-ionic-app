import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Database } from '@ionic/storage';

@Component({
  selector: 'app-bank-select',
  templateUrl: './bank-select.component.html',
  styleUrls: ['./bank-select.component.scss'],
})
export class BankSelectComponent implements OnInit {

  banks:any =[];
  filtered  = [];
  searchkey = "";

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
   
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

    this.filtered = this.banks.filter(function (el:any) {
        return ( (el.name.toLowerCase().indexOf(key.toLowerCase())>-1))
           
      });
  }


}
