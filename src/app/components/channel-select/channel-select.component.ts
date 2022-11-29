import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Database } from '@ionic/storage';

@Component({
  selector: 'app-channel-select',
  templateUrl: './channel-select.component.html',
  styleUrls: ['./channel-select.component.scss'],
})

export class ChannelSelectComponent implements OnInit {

  channels:any =[];
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

    this.filtered = this.channels.filter(function (el:any) {
        return ( (el.name.toLowerCase().indexOf(key.toLowerCase())>-1))
           
      });
  }


}
