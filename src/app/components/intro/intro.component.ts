import { ModalController, NavController } from '@ionic/angular';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss'],
})

export class IntroComponent implements OnInit {

  constructor(private modal:ModalController,private nav:NavController) { }

  ngOnInit() {

  }

  acceptPolicy() {
    this.modal.dismiss()
  }

  cancelRegistration() {
    this.modal.dismiss();
    this.nav.back();
  }

  
}
