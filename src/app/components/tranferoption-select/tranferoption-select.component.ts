import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Database } from '@ionic/storage';

@Component({
  selector: 'app-tranferoption-select',
  templateUrl: './tranferoption-select.component.html',
  styleUrls: ['./tranferoption-select.component.scss'],
})
export class TranferOptionSelectComponent implements OnInit {

  tranferoptions:any =[];
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

    this.filtered = this.tranferoptions.filter(function (el:any) {
        return ( (el.option_name.toLowerCase().indexOf(key.toLowerCase())>-1))
           
      });
  }


}
