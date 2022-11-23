import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})

export class ProfilePage implements OnInit {

    constructor(private router: Router) { }

    ngOnInit() {
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

}
