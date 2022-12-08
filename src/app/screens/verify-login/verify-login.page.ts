import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, NavController, Platform, ToastController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { DataService } from 'src/app/services/data.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-verifylogin',
  templateUrl: './verify-login.page.html',
  styleUrls: ['./verify-login.page.scss'],
})
export class VerifyLoginPage implements OnInit,AfterViewInit {

 
  data: any = {};
  exitcounter = 0;
  isNewForm = true;
  passType = 'password';
  otp="";

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

    if(!this.dataService.user){
      this.uiService.showToast('Invalid session detected!')
      this.authService.logout();
    }

    this.data.user_id = this.dataService.user.id;

    
  }

  ngAfterViewInit(): void {
    this.focusInputs(1,false);
  }

  focusInputs(index=1,goNext=true){
  
       const currenIndex = (goNext)?index+1:index;
       const currenPos   = (goNext)?2:1;

       console.log('length',this.otp.length);
       console.log('position',currenPos);
       console.log('index',currenIndex);

       if((this.otp.length+ currenPos)==currenIndex){
        document.getElementById('input'+currenIndex)!.focus();
        document.getElementById('input'+currenIndex)!.style.border = "2px solid var(--ion-color-dark)";
       }
  }

  back(){
    this.otp = this.otp.slice(0,-1);
    this.focusInputs();
  }

  getOtpField(index:number){
   return this.otp.substring(0,index);
  }

  setOtpField(event:any,index:number){

    console.log(event)
    console.log('index',index)

    if(this.otp.length+1 ==index ){

      if (event.keyCode === 8 || event.keyCode === 37) {
        var thisInput = document.getElementById('input' + (index+1))!.focus();
       }

      const value = event.target.value;
      this.otp+=value;
      
      if(this.otp.length ==4){
        this.doVerifyLogin();
      }else{
        this.focusInputs(index);
      }

  }

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

  doVerifyLogin() {

    this.uiService.showLoader();

    this.authService.verifyLogin(this.data).subscribe(
      (response) => {
        this.uiService.hideLoader();
        if (response?.data) {
          this.dataService.user = response.data;
          this.router.navigate(['tabs']);
        }else{
          const msg = (response.message)?response.message:'Verification failed due to an error,try again';
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

  onOtpChange(event:any){

  }


}
