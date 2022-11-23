import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, NavController, Platform, ToastController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  data: any = {};
  exitcounter = 0;
  isNewForm = true;
  passType = 'password';
  appName = 'Artisan';
  user = {
    name: 'Henry Mayanja',
    id: 100,
    address: 'Kampala, Uganda',
    account: 764764,
    vehicle: 'UAS 4456H'
  };

  slideOptions = {
    initialSlide: 0,
    autoplay: true.valueOf,
  };

  constructor(
    private menu: MenuController,
    private router: Router,
    private platform: Platform,
    private toastCtrl: ToastController,
    private navCtrl: NavController,
    private authService: AuthenticationService,
    private uiService: UiService

  ) { }

  ngOnInit() {
    this.menu.enable(false);
    this.handleBack();
  }

  toggleMenu() {
    this.menu.toggle();
  }

  handleBack() {
    this.platform.backButton.subscribeWithPriority(10, () => {
      console.log('Handler was called! on ' + this.router.url);

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

  doLogin() {
    // this.authService.getIn(this.user);

    this.uiService.showLoader();
    //this.data
    this.authService.remoteLogin().subscribe(
      (response) => {
        this.uiService.hideLoader();
        if (response?.access_token) {
          this.data.password = '';
          this.authService.authToken = response.access_token;
          this.authService.getIn(this.user);
        }
      }, error => {
        this.uiService.hideLoader();
        this.uiService.showToast('Could not reach the server');
      });

  }

  toggleType() {
    this.passType = (this.passType === 'password') ? 'text' : 'password';
  }

}
