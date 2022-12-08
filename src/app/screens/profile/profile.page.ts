import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { KycComponent } from 'src/app/components/kyc/kyc.component';
import { ModalController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})

export class ProfilePage implements OnInit {

    constructor(private dataService:DataService, private router: Router,private  modalController: ModalController) { }

    ngOnInit() {
    }

    showBeneficiaries() {
        this.router.navigate(['/beneficiaries']);
    }

    showRefferals() {
        this.router.navigate(['/refferals']);
    }

    showLocations() {
        this.router.navigate(['/contact']);
    }

    goToPassword() {
        this.router.navigate(['/change-pass']);
    }

    goToLanguages() {
        this.router.navigate(['/languages']);
    }

    goToAccount() {
        this.router.navigate(['/account']);
    }

    goToNotification() {
        this.router.navigate(['/notification']);
    }

    goToCart() {
        this.router.navigate(['/cart']);
    }

    logout() {
        this.dataService.user = {};
        this.router.navigate(['/']);
    }

    async showKyc(){
        const modal = await this.modalController.create({
            component: KycComponent,
        });

        await modal.present();
    }

}
