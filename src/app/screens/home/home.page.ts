import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, NavController, Platform, ToastController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { DataService } from 'src/app/services/data.service';
import { TransactService } from 'src/app/services/transact/transact.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  exitcounter = 0;
  user: any   = {name:"Henry Nkuke"};
  orders: any = [{"currency":"UGX/USD"}];
  
  widgets = [
    { name: 'Forex', icon: 'repeat-outline', link: 'forex' },
    { name: 'Remittances', icon: 'push-outline', link: 'remit' },
    { name: 'Others', icon: 'qr-code-outline', link: '' }
  ];
  constructor(
    private menu: MenuController,
    private router: Router,
    private platform: Platform,
    private toastCtrl: ToastController,
    private navCtrl: NavController,
    private authService: AuthenticationService,
    private dataService: DataService,
    private tranService: TransactService,
    private uiService: UiService
  ) { }

  ngOnInit() {
    this.menu.enable(true);
    //this.getTransactions();
    this.handleBack();
    //this.user = this.authService.user;
  }

  toggleMenu() {
    this.menu.toggle();
  }

  getTransactions() {
    // this.uiService.showLoader();
    // this.tranService.getTransactions(10).subscribe(response => {
    //   this.uiService.hideLoader();
    //   this.dataService.log(response);
    //   this.orders = response.sales;
    // }, error => {
    //   this.uiService.hideLoader();
    //   this.dataService.log(error);
    // });
  }

  handleBack() {
    this.platform.backButton.subscribeWithPriority(10, () => {
     // this.dataService.log('Handler was called! on ' + this.router.url);

      if (this.router.url === '/home' || this.router.url === '/login') {
        if (this.exitcounter < 1
        ) {
          this.exitcounter++;
          this.showExitToast();
        } else {
          //navigator['app'].exitApp();
        }
      } else {
        this.navCtrl.back();
      }
    });

  }

  async showExitToast() {
    const toast = await this.toastCtrl.create({
      message: 'Press back again to exit',
      duration: 3000
    });
    await toast.present();
    //reset counter after 5 seconds
    setTimeout(() => {
      this.exitcounter = 0;
    }, 5000);
  }

 goTo(link:any) {
    this.router.navigate([link]);
  }

  log(msg:any, key = '') {
    console.log(key, msg);
  }

}
