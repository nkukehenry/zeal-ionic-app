import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-status-modal',
  templateUrl: './status-modal.component.html',
  styleUrls: ['./status-modal.component.scss'],
})
export class StatusModalComponent implements OnInit {

  @Input() status:any;

  constructor(private modalController: ModalController) { }

  ngOnInit() {
    console.log(this.status);

    setTimeout(() => {
      this.modalController.dismiss();
    }, 3000);
    
  }

  closeModal(){
    this.modalController.dismiss();
  }

}
