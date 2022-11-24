import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, NavController, Platform, ToastController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { DataService } from 'src/app/services/data.service';
import { ForexService } from 'src/app/services/forex/forex.service';
import { TransactService } from 'src/app/services/transact/transact.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-forex',
  templateUrl: './forex.page.html',
  styleUrls: ['./forex.page.scss'],
})
export class ForexPage implements OnInit {

  exitcounter = 0;
  
  mainPairs = [];
  constructor(
    private menu: MenuController,
    private router: Router,
    private platform: Platform,
    private toastCtrl: ToastController,
    private navCtrl: NavController,
    private authService: AuthenticationService,
    private dataService: DataService,
    private forexService: ForexService
  ) { }

  ngOnInit() {
    this.mainPairs = this.dataService.mainPairs;
  }

 goTo(link:any) {
    this.router.navigate([link]);
  }

  log(msg:any, key = '') {
    console.log(key, msg);
  }

}
