import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { DataService } from 'src/app/services/data.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-verifyregistration',
  templateUrl: './verify-registration.page.html',
  styleUrls: ['./verify-registration.page.scss'],
})
export class VerifyRegistrationPage implements OnInit {

  data: any = {};
  exitcounter = 0;
  isNewForm = true;
  passType = 'password';

  slideOptions = {
    initialSlide: 0,
    autoplay: true,
  };

  constructor(
    private router: Router,
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
    console.log(this.dataService.user);
  }

  doVerifyRegistration() {

    this.uiService.showLoader();

    this.authService.verifyRegistration(this.data).subscribe(
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


}
