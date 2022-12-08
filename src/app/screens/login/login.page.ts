import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackgroundColorOptions, StatusBar } from '@capacitor/status-bar';
import { MenuController, NavController, Platform, ToastController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { DataService } from 'src/app/services/data.service';
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
    private dataService: DataService

  ) { }

  ngOnInit() {

    // const showStatusBar = async () => {
    //   await StatusBar.show();
    // };

    

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

    this.uiService.showLoader();

    this.authService.remoteLogin(this.data).subscribe(
      (response) => {
        this.uiService.hideLoader();
        if (response?.data) {
          this.authService.getIn(response.data);
          this.dataService.user = response.data;
        }else{
          const msg = (response.message)?response.message:'Login failed due to an error,try again';
          this.uiService.showAlert(msg);
        }
      }, error => {
        this.uiService.hideLoader();
        this.uiService.showToast('Could not reach the server');
      });

  }

  toggleType() {
    this.passType = (this.passType === 'password') ? 'text' : 'password';
  }

  goToRegister() {
    this.router.navigate(['register']);
  }


}
