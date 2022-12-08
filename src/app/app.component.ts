import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavController, Platform, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { App } from '@capacitor/app';
import { StatusBar } from '@capacitor/status-bar';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{

  exitcounter = 0;
  idleState = 'Not started.';
  timedOut = false;
  alertShown = false;

  constructor(
    private platform: Platform,
    //private splashScreen: SplashScreen,
    private toastCtrl: ToastController,
    private navCtrl: NavController,
    private router:Router,
    private  modalController: ModalController,
    private storage:Storage
    //private fcm: FCM,
  ) {
    this.initializeApp();
  }

  ngOnInit(): void {

    const changeStatusBarColor = async () => {

      await StatusBar.setBackgroundColor({color:"#283A90"});
      
      }
    
  }

  initializeApp() {

      this.platform.ready().then(() => {
      //this.statusBar.styleDefault();
      //this.splashScreen.hide();
      this.storage.create();
      this.handleBack();
      //this.initPushNotifications();

     // StatusBar.setOverlaysWebView({ overlay: true });

      // const hideStatusBar = async () => {
      //   await StatusBar.hide();
      // };
      
    });
  }
 

  handleBack() {
    this.platform.backButton.subscribeWithPriority(10, () => {
      
      console.log(this.router.url);

      const lastRoutes = ['/login','/splash','/tabs/home','/','']

      //console.error('Handler was called! on '+this.router.url);
      if (lastRoutes.indexOf(this.router.url)!==-1) {
        if (this.exitcounter < 1
        ) {
          this.exitcounter++;
          this.showExitToast();
        } else {

        if(this.router.url.indexOf('tabs/home')>-1)
          this.router.navigate(['/']);
        else
          App.exitApp();
        }
      }
      else if( this.router.url === "/register"){

        if (this.exitcounter < 1) {
            this.exitcounter++;
            this.modalController.dismiss();
          } else {

            try{
              this.modalController.dismiss();
             } catch(error){
              console.log(error);
            }
            
            this.navCtrl.back();
          }

      } 
      else {

        try{
          this.modalController.dismiss();
         } catch(error){
          console.log(error);
        }

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

}
