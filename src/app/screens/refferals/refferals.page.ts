import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { KycComponent } from 'src/app/components/kyc/kyc.component';
import { ModalController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-refferals',
  templateUrl: './refferals.page.html',
  styleUrls: ['./refferals.page.scss'],
})

export class RefferalsPage implements OnInit {

    refferals:any=[];

    constructor(private dataService: DataService,private router: Router,private  modalController: ModalController) { }

    ngOnInit() {

        this.refferals = this.dataService.refferals;
    }

    goToReview() {
        this.router.navigate(['/review']);
    }

    goToWishlist() {
        this.router.navigate(['/wishlist']);
    }

    goToAddresses() {
        this.router.navigate(['/addresses']);
    }

    goToPassword() {
        this.router.navigate(['/change-password']);
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
        this.router.navigate(['/']);
    }

    async showKyc(){
        const modal = await this.modalController.create({
            component: KycComponent,
        });

        await modal.present();
    }

}
