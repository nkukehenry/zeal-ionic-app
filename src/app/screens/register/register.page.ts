import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, ModalController, NavController, Platform, ToastController } from '@ionic/angular';
import { IntroComponent } from 'src/app/components/intro/intro.component';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  data: any = {};
  exitcounter = 0;
  isNewForm = true;
  passType = 'password';

  slideOptions = {
    initialSlide: 0,
    autoplay: true,
  };

  constructor(
    private menu: MenuController,
    private router: Router,
    private platform: Platform,
    private toastCtrl: ToastController,
    private navCtrl: NavController,
    private authService: AuthenticationService,
    private uiService: UiService,
    private modalController:ModalController

  ) { }

  ngOnInit() {
    this.menu.enable(false);
    this.handleBack();
      this.showPolicyDialog();
    }
  
    async showPolicyDialog(){
  
      const  modal = await this.modalController.create({
        component:IntroComponent
      });
  
       modal.present();
    }

  handleBack() {
    this.platform.backButton.subscribeWithPriority(10, () => {
      console.log('Handler was called! on ' + this.router.url);

      if (this.router.url === '/tabs' || this.router.url === '/register') {
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

  doRegister() {

    this.uiService.showLoader();

    this.authService.remoteRegister(this.data).subscribe(
      (response) => {
        this.uiService.hideLoader();
        if (response?.data) {
          this.authService.getIn(response.data);
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
