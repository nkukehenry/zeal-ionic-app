import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, ModalController, NavController, Platform, ToastController } from '@ionic/angular';
import { IntroComponent } from 'src/app/components/intro/intro.component';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { DataService } from 'src/app/services/data.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  data: any = {country:1};
  exitcounter = 0;
  isNewForm = true;
  passType = 'password';

  slideOptions = {
    initialSlide: 0,
    autoplay: true,
  };

  constructor(
    private dataService: DataService,
    private authService: AuthenticationService,
    private uiService: UiService,
    private modalController:ModalController,
    private router: Router

  ) { }

  ngOnInit() {
      this.showPolicyDialog();
    }
  
    async showPolicyDialog(){
  
      const  modal = await this.modalController.create({
        component:IntroComponent
      });
  
       modal.present();
    }


  doRegister() {

    this.uiService.showLoader();

    this.authService.remoteRegister(this.data).subscribe(
      (response) => {
        this.uiService.hideLoader();
        
        if (!response.is_error) {
          this.dataService.user = response.data;
          this.router.navigate(['verify-login']);
        }else{
          this.uiService.showAlert(response.message);
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
