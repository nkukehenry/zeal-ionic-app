import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Database } from '@ionic/storage';

@Component({
  selector: 'app-add-beneficiary',
  templateUrl: './add-beneficiary.component.html',
  styleUrls: ['./add-beneficiary.component.scss'],
})
export class AddBeneficiaryComponent implements OnInit {

  amount:number=0;
  data:any ={};

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
   this.data.amount = this.amount;
  }

  closeModal(hasData:Boolean){
    console.log(this.data);

    this.modalCtrl.dismiss({
      'dismissed': true,
      'data':(hasData)?this.data:null
    });
  }




}
