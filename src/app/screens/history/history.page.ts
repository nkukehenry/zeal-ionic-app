import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, ModalController, NavController, Platform, ToastController } from '@ionic/angular';
import { TranDetailComponent } from 'src/app/components/trandetail/trandetail.component';
import { DataService } from 'src/app/services/data.service';
import { TransactService } from 'src/app/services/transact/transact.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

  transactions = [];

  constructor(
    private menu: MenuController,
    private router: Router,
    private platform: Platform,
    private toastCtrl: ToastController,
    private navCtrl: NavController,
    private uiService: UiService,
    private dataService: DataService,
    private transactService: TransactService,
    private modalController: ModalController
  ) { }

  ngOnInit() {

    this.transactions = this.dataService.transactions;
    this.getTransactions();
  }

 goTo(link:any) {
    this.router.navigate([link]);
  }

  getTransactions(){
    this.uiService.showLoader();
    this.transactService.getTransactions(20,1).subscribe((response)=>{
      this.uiService.hideLoader();
      this.transactions = response;
      this.dataService.transactions = response;

      console.log(response);

    },(error)=>{

    });

  }


  handleRefresh(event:any){
    this.getTransactions();
    event.target.complete();

    setTimeout(() => {
      event.target.complete();
    }, 2000);

  }

  log(msg:any, key = '') {
    console.log(key, msg);
  }


  async showDetails(transaction:any){

    const modal = await this.modalController.create({
      component: TranDetailComponent,
      componentProps:{transaction:transaction}
    });

    await modal.present();
    
  }

}
