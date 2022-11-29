import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Database } from '@ionic/storage';

@Component({
  selector: 'app-purpose-select',
  templateUrl: './purpose-select.component.html',
  styleUrls: ['./purpose-select.component.scss'],
})
export class PurposeSelectComponent implements OnInit {

  purposes:any =[];
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

    this.filtered = this.purposes.filter(function (el:any) {
        return ( (el.description.toLowerCase().indexOf(key.toLowerCase())>-1))
           
      });
  }


}
