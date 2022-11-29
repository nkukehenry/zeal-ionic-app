import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Database } from '@ionic/storage';

@Component({
  selector: 'app-source-select',
  templateUrl: './source-select.component.html',
  styleUrls: ['./source-select.component.scss'],
})
export class SourceSelectComponent implements OnInit {

  sources:any =[];
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

    this.filtered = this.sources.filter(function (el:any) {
        return ( (el.description.toLowerCase().indexOf(key.toLowerCase())>-1))
           
      });
  }


}
